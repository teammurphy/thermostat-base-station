import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { TempReading } from '../sharedSchemes/interfaces/temp.interface';
import { CreateTempDTO } from '../sharedSchemes/dto/create-temp.dto';
import { Settings } from "../sharedSchemes/interfaces/settings.interface";
import { CreateSettingsDTO } from "../sharedSchemes/dto/create-settings.dto";

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

  async getAllSettings(): Promise<Settings[]> {
    return await this.settingsModel.find().select(['-_id', '-__v']).exec();
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
