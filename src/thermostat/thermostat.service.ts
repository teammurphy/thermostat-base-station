import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ZoneSettings } from '../sharedSchemes/interfaces/zoneSettings.interface';
import { SetTemps } from '../sharedSchemes/interfaces/setTemps.interface';
import { SensorReadings } from '../sharedSchemes/interfaces/sensorReadings.interface';
import { ZoneSettingsDTO } from '../sharedSchemes/dto/zoneSettings.dto';
import { SetTempsDTO } from '../sharedSchemes/dto/setTemps.dto';
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

  getSecSinceMidnight(): number {
    const mmt = moment();
    const mmtMidnight = mmt.clone().startOf('day');
    return mmt.diff(mmtMidnight, 'seconds');
  }

  async getZoneNumbers(): Promise<number[]> {
    // TODO: add filter by disabled
    const zones = await this.zoneSettingsModel.find();

    return zones.map(function(e: ZoneSettings): number {
      return e.zone_number;
    });
  }

  async getCurrentTempBySensors(sensors: number[]): Promise<number> {
    const tempReadingModelObj = this.sensorsReadingModel;

    let temps: number[] = await Promise.all(
      sensors.map(async function(sensor_num: number): Promise<number> {
        const reading = await tempReadingModelObj
          .findOne({
            sensor_id: sensor_num,
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

  async getSetTempsByZone(zone_num: number): Promise<SetTempsDTO[]> {
    // TODO - Format time
    const set_temps = await this.setTempsModel.find(
      { zone_number: zone_num },
      { start_time: 1, set_temp: 1, _id: 0 },
    );
    return set_temps;
  }

  async getCurrentSetTempByZone(zone_num: number): Promise<number> {
    const sec_since_midnight = this.getSecSinceMidnight();

    const set_temp = await this.setTempsModel
      .findOne({
        zone_number: zone_num,
        start_time: { $lt: sec_since_midnight },
      })
      .sort({ start_time: -1 })
      .exec();

    return set_temp['set_temp'];
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

  async editSetTemp(
    zone_num: number,
    new_set_temp: number,
    start_time: number,
    expireAt?: Date,
  ) {
    const new_temp = new this.setTempsModel();

    new_temp.zone_number = zone_num;
    new_temp.set_temp = new_set_temp;
    new_temp.start_time = start_time;

    if (typeof expireAt != 'undefined') {
      new_temp.expireAt = expireAt;
    }

    await new_temp.save();
  }

  async bumpSetTemp(
    zone_num: number,
    new_set_temp: { set_temp: number },
  ): Promise<ZoneSettingsDTO> {
    const mill_since_midnight = this.getSecSinceMidnight();

    const dateTimeNow = new Date();
    const expire_date_time = new Date(
      dateTimeNow.setHours(dateTimeNow.getHours() + 1),
    );

    await this.setTempsModel.deleteMany(
      { zone_number: zone_num, expireAt: { $exists: true } },
      function(err) {
        if (err) {
          console.log(err);
        }
      },
    );

    await this.editSetTemp(
      zone_num,
      new_set_temp['set_temp'],
      mill_since_midnight,
      expire_date_time,
    );

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

  async addZone(zoneSettings: ZoneSettingsDTO): Promise<boolean> {
    // TODO error and return stuff
    const set_temp: number = zoneSettings['set_temp'];
    delete zoneSettings[set_temp];
    this.editSetTemp(zoneSettings['zone_number'], set_temp, 0);

    const new_zone = new this.zoneSettingsModel(zoneSettings);
    new_zone.save(function(err) {
      if (err) return console.error(err);
    });
    return true;
  }
}
