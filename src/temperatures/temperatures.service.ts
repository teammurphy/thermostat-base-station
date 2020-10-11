import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { TempReading } from '../sharedSchemes/interfaces/temp.interface';
import { CreateTempDTO } from '../sharedSchemes/dto/create-temp.dto';

@Injectable()
export class TemperaturesService {
  constructor(@InjectModel('TempReading') private readonly tempReadingModel: Model<TempReading>) { }

  async getTemps(): Promise<TempReading[]> {
    const temps = await this.tempReadingModel.find().exec();
    return temps;
  }

  async getTemp(tempID): Promise<TempReading> {
    const temp = await this.tempReadingModel
      .findById(tempID)
      .exec();
    return temp;
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
