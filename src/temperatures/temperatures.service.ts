import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { TempReading } from '../sharedSchemes/interfaces/temp.interface';
import { CreateTempDTO } from '../sharedSchemes/dto/create-temp.dto';
import { Settings } from "../sharedSchemes/interfaces/settings.interface";
import { CreateSettingsDTO } from "../sharedSchemes/dto/create-settings.dto";
import { zoneinfoDTO } from '../sharedSchemes/dto/zoneinfo.dto';
import  *  as _ from 'lodash';
import { runInThisContext } from 'vm';

@Injectable()
export class TemperaturesService {
  constructor(@InjectModel('TempReading') private readonly tempReadingModel: Model<TempReading>, @InjectModel('Settings') private readonly settingsModel: Model<Settings>) { }

  async getTemps(): Promise<TempReading[]> {
    return await this.tempReadingModel.find().select(['-_id', '-__v']).exec();
  }

  async getTemp(tempID): Promise<TempReading> {
    const temp = await this.tempReadingModel
      .findById(tempID)
      .exec();
    return temp;
  }

  async getSetTempbyZoneNum(zone_num): Promise<number> {
    const zone_settings = await this.settingsModel.findOne({ zone: zone_num });
    return zone_settings.set_temp;
  }

  async getZoneNumbers():Promise<number[]>{
    // todo: add filter by disabled
    const zones = await this.settingsModel.find().select('zone').exec();
    return zones.map(function(e: Settings): number{
      return e.zone;
    })
  }

  async getZoneInfo(zone_num: number): Promise<Settings>{
    //return await this.settingsModel.findOne({zone: zone_num})
    const zone_settings = this.settingsModel.findOne({zone: zone_num})
    const current_zone_temp = this.getCurrentTempByZoneNum(zone_num)
    return zone_settings

  }

  async getCurrentTempBySensors(sensors: number[]):Promise<number>{
    const tempReadingModelObj = this.tempReadingModel;

    const temps: number[] = await Promise.all(sensors.map(async function(e: number): Promise<number> {
      const reading = await tempReadingModelObj.findOne({ thermo_id: e }).sort({ date: -1 });
      return reading.temp;
    }));

    return Math.round(temps.reduce((a, b) => a + b, 0) / temps.length);
  }

  async getCurrentTempByZoneNum(zone_num: number): Promise<number> {
    const zone_settings = await this.settingsModel.findOne({ zone: zone_num });
    const sensors = zone_settings.thermo_ids;
    return await this.getCurrentTempBySensors(sensors)
  }

  async getAllSettings(): Promise<Settings[]> {
    return await this.settingsModel.find().select(['-_id', '-__v']).exec();
  }

  async getHomeInfo():Promise<any>{
    const zones = await this.getZoneNumbers()
    console.log(zones)
    const zone_info = await Promise.all(zones.map(this.getZoneInfo.bind(this)))
    console.log(zone_info)

    return [{"t":"1"}]
  }


  async editTemp(tempID, createTempDTO: CreateTempDTO): Promise<TempReading> {
    const editedTemp = await this.tempReadingModel
      .findByIdAndUpdate(tempID, createTempDTO, { new: true });
    return editedTemp;
  }

  async deleteTemp(tempID): Promise<any> {
    const deletedTemp = await this.tempReadingModel
      .findByIdAndRemove(tempID);
    return deletedTemp;
  }
}
