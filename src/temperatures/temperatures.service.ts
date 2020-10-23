import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { TempReading } from '../sharedSchemes/interfaces/temp.interface';
import { Settings } from "../sharedSchemes/interfaces/settings.interface";
import { SetTemps } from "../sharedSchemes/interfaces/setTemps.interface";
import { zoneinfoDTO } from '../sharedSchemes/dto/zoneinfo.dto';
import { CreateZoneDTO } from '../sharedSchemes/dto/create-zone.dto';

@Injectable()
export class TemperaturesService {
  constructor(@InjectModel('TempReading') private readonly tempReadingModel: Model<TempReading>, 
  @InjectModel('Settings') private readonly settingsModel: Model<Settings>, 
  @InjectModel('SetTemps') private readonly setTempModel:Model<SetTemps>) { }

  async getTemps(): Promise<TempReading[]> {
    return await this.tempReadingModel.find().select(['-_id', '-__v']).exec();
  }

  async getSetTempbyZoneNum(zone_num:number): Promise<number> {
    //todo figure out whitch time it is in
    const zone_settings = await this.settingsModel.findOne({ zone_number: zone_num });
    const currernt_temp = await zone_settings.set_temps
    console.log(currernt_temp[0]);
    return currernt_temp[0]['set_temp'];
  }

  async getZoneNumbers():Promise<number[]>{
    // todo: add filter by disabled
    const zones = await this.settingsModel.find().select('zone_number').exec();
    return zones.map(function(e: Settings): number{
      return e.zone_number;
    })
  }

  async getZoneByNum(zone_num:number):Promise<Settings>{
    return await this.settingsModel.findOne({zone_number: zone_num})
  }

  async getZoneInfo(zone_num: number): Promise<zoneinfoDTO>{
    const zone_settings = await this.settingsModel.findOne({zone_number: zone_num})
    const current_zone_temp = await this.getCurrentTempByZoneNum(zone_num)

    return zoneinfoDTO.createDTO(zone_settings, current_zone_temp)
  }

  async getCurrentTempBySensors(sensors: number[]):Promise<number>{
    const tempReadingModelObj = this.tempReadingModel;

    let temps: number[] = await Promise.all(sensors.map(async function(e: number): Promise<number> {
      const reading = await tempReadingModelObj.findOne({ thermo_id: e, date: {"$gte":new Date(Date.now() - (15*60*1000)) }}).sort({ date: -1 });
      if (reading != null){
        return reading.temp;
      }
    }));
    temps = temps.filter(function(e){
      return e != null;
    })

    return Math.round(temps.reduce((a, b) => a + b, 0) / temps.length);
  }

  async getCurrentTempByZoneNum(zone_num: number): Promise<number> {
    const zone_settings = await this.settingsModel.findOne({ zone_number: zone_num });
    const sensors = zone_settings.thermo_ids;
    return await this.getCurrentTempBySensors(sensors)
  }

  async getAllSettings(): Promise<Settings[]> {
    return await this.settingsModel.find().select(['-_id', '-__v']).exec();
  }

  async getHomeInfo():Promise<any>{
    const zones = await this.getZoneNumbers()
    const zone_info: any = await Promise.all(zones.map(this.getZoneInfo.bind(this)))

    return zone_info
  }

  async createZone(zone_info: CreateZoneDTO):Promise<CreateZoneDTO>{
    const new_zone = new this.settingsModel(zone_info)
    new_zone.save(function (err){
      if (err) return console.error(err);
    })
    return zone_info
  }

  async deleteZone(zone_num: number):Promise<boolean>{
    //todo raise exceptions
    try{ 
      await this.settingsModel.findOneAndDelete({zone_number:zone_num})
    }
    catch(e){
      return false
    }
    return true
  }

  async addSensorsToZone(zone_num:number,sensor_ids:[number]):Promise<any>{
    const zone = await this.settingsModel.findOne({zone_number: zone_num})
    zone.thermo_ids = sensor_ids
    await zone.save()
    return zone
  }

  async editZone(zone_num:number, updated_zone:CreateZoneDTO):Promise<CreateZoneDTO>{
    const new_zone:CreateZoneDTO = await this.settingsModel.findOneAndUpdate({zone_number:zone_num},updated_zone, {
      new: true
    })
    return new_zone;
  }

  async editSetTemp(zone_num:number, new_set_temp:JSON): Promise<CreateZoneDTO>{
    const new_zone: CreateZoneDTO = await this.settingsModel.findOneAndUpdate({zone_number:zone_num}, {set_temp:new_set_temp['set_temp']}, {
      new: true
    })
    return new_zone
  }


  async editHighSet(zone_num:number, new_high_temp:JSON):Promise<CreateZoneDTO>{
    const new_zone: CreateZoneDTO = await this.settingsModel.findOneAndUpdate({zone_number:zone_num}, {high_set:new_high_temp['high_set']}, {
      new: true
    })
    return new_zone
  }

  async editLowSet(zone_num:number, new_low_temp:JSON):Promise<CreateZoneDTO>{
    const new_zone: CreateZoneDTO = await this.settingsModel.findOneAndUpdate({zone_number:zone_num}, {low_set:new_low_temp['low_set']}, {
      new: true
    })
    return new_zone
  }
}
