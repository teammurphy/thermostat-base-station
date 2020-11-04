import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ZoneSettings } from '../sharedSchemes/interfaces/zoneSettings.interface';
import { SetTemps } from '../sharedSchemes/interfaces/setTemps.interface';
import { SensorReadings } from '../sharedSchemes/interfaces/sensorReadings.interface';
import { ZoneSettingsDTO } from '../sharedSchemes/dto/zoneSettings.dto';
import * as moment from 'moment';

@Injectable()
export class ThermostatService {
  constructor(
    @InjectModel('ZoneSettings')
    private readonly zoneSettingsModel: Model<ZoneSettings>,
    @InjectModel('SetTemps') private readonly setTempsModel: Model<SetTemps>,
    @InjectModel('SensorReadings')
    private readonly sensorsReadingModel: Model<SensorReadings>,
  ) {}

  getTimeSinceMidnight(): number {
    return (
      moment().valueOf() -
      moment()
        .startOf('day')
        .valueOf()
    );
  }

  async getZoneNumbers(): Promise<number[]> {
    // TODO: add filter by disabled
    const zones = await this.zoneSettingsModel
      .find()
      .select('zone_number')
      .exec();

    return zones.map(function(e: ZoneSettings): number {
      return e.zone_number;
    });
  }
  async getCurrentTempBySensors(sensors: number[]): Promise<number> {
    const tempReadingModelObj = this.sensorsReadingModel;

    let temps: number[] = await Promise.all(
      sensors.map(async function(e: number): Promise<number> {
        const reading = await tempReadingModelObj
          .findOne({
            sensor_id: e,
            timestamp: { $gte: new Date(Date.now() - 15 * 60 * 1000) },
          })
          .sort({ timestamp: -1 });
        if (reading != null) {
          return reading.temperature;
        }
      }),
    );
    temps = temps.filter(function(e) {
      return e != null;
    });

    return Math.round(temps.reduce((a, b) => a + b, 0) / temps.length);
  }

  async getCurrentTempByZoneNum(zone_num: number): Promise<number> {
    const zone_settings = await this.zoneSettingsModel.findOne({
      zone_number: zone_num,
    });
    const sensors = zone_settings.sensor_ids;
    return await this.getCurrentTempBySensors(sensors);
  }

  async getCurrentSetTempByZone(zone_num: number): Promise<number> {
    //current time in millisecods since midnight
    const currentTime = this.getTimeSinceMidnight();

    const set_temps = await this.setTempsModel.find({ zone_number: zone_num });

    if (set_temps.length == 0) {
      //TODO - raise real error
      return -99;
    }

    const filtered_temps = set_temps.filter(
      // returns list where the current time is withing the range of set temps start and end
      temp => {
        return temp.start_time <= currentTime && currentTime <= temp.end_time;
      },
    );

    const filtered_zone_info = filtered_temps.map(temp => ({
      //gets the range of each set temp, how long is each range
      range: temp['end_time'] - temp['start_time'],
      set_temp: temp['set_temp'],
    }));

    const current_set_temp_range = Math.min.apply(
      //find the most specefic range from the list
      null,
      filtered_zone_info.map(ranger => ranger.range),
    );

    const current_set_temp = filtered_zone_info.find(
      //matches the min range to the temp and reterns the temp
      zone_info => zone_info['range'] == current_set_temp_range,
    ).set_temp;

    return current_set_temp;
  }

  async getZoneInfo(zone_num: number): Promise<ZoneSettingsDTO> {
    const zone_settings = await this.zoneSettingsModel.findOne({
      zone_number: zone_num,
    });
    const current_zone_temp = await this.getCurrentTempByZoneNum(zone_num);
    const current_zone_set_temp = await this.getCurrentSetTempByZone(
      zone_settings.zone_number,
    );

    return ZoneSettingsDTO.createDTO(
      zone_settings,
      current_zone_temp,
      current_zone_set_temp,
    );
  }

  async getHomeInfo(): Promise<ZoneSettingsDTO[]> {
    const zones = await this.getZoneNumbers();

    const zone_info: any = await Promise.all(
      zones.map(this.getZoneInfo.bind(this)),
    );

    return zone_info;
  }

  async addSensorsToZone(
    zone_num: number,
    sensor_ids: number[],
  ): Promise<ZoneSettingsDTO> {
    const zone = await this.zoneSettingsModel.findOne({
      zone_number: zone_num,
    });
    zone.sensor_ids = sensor_ids;
    await zone.save();
    return await this.getZoneInfo(zone_num);
  }

  async bumpSetTemp(
    zone_num: number,
    new_set_temp: JSON,
  ): Promise<ZoneSettingsDTO> {
    const millseconds_in_hour = 3600000;
    const new_temp = new this.setTempsModel();
    const currentTime = this.getTimeSinceMidnight();

    new_temp.set_temp = new_set_temp['set_temp'];
    new_temp.start_time = currentTime;
    new_temp.end_time = currentTime + millseconds_in_hour;

    const dateTimeNow = new Date();
    new_temp.expireAt = new Date(
      dateTimeNow.setHours(dateTimeNow.getHours() + 1),
    );
    await new_temp.save();

    return await this.getZoneInfo(zone_num);
  }

  async editHighSet(
    zone_num: number,
    new_high_temp: JSON,
  ): Promise<ZoneSettingsDTO> {
    await this.zoneSettingsModel.findOneAndUpdate(
      { zone_number: zone_num },
      { high_set: new_high_temp['high_set'] },
      {
        new: true,
      },
    );
    return await this.getZoneInfo(zone_num);
  }

  async editLowSet(
    zone_num: number,
    new_low_temp: JSON,
  ): Promise<ZoneSettingsDTO> {
    await this.zoneSettingsModel.findOneAndUpdate(
      { zone_number: zone_num },
      { low_set: new_low_temp['low_set'] },
      {
        new: true,
      },
    );
    return await this.getZoneInfo(zone_num);
  }
}
