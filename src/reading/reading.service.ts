import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Temp } from '../sharedSchemes/interfaces/temp.interface';
import { CreateTempDTO } from '../sharedSchemes/dto/create-temp.dto';

@Injectable()
export class ReadingService {

  constructor(@InjectModel('Temp') private readonly tempModel: Model<Temp>) { }

  async getTemps(): Promise<Temp[]> {
    const temps = await this.tempModel.find().exec();
    return temps;
  }

  async getTemp(tempID): Promise<Temp> {
    const temp = await this.tempModel
      .findById(tempID)
      .exec();
    return temp;
  }

  async addTemp(data: CreateTempDTO) {
    const newTemp = await new this.tempModel(data);
    newTemp.save();
  }

  async editTemp(tempID, createTempDTO: CreateTempDTO): Promise<Temp> {
    const editedTemp = await this.tempModel
      .findByIdAndUpdate(tempID, createTempDTO, { new: true });
    return editedTemp;
  }

  async deleteTemp(tempID): Promise<any> {
    const deletedTemp = await this.tempModel
      .findByIdAndRemove(tempID);
    return deletedTemp;
  }

}
