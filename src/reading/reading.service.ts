import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { TempReading } from '../sharedSchemes/interfaces/temp.interface';
import { CreateTempDTO } from '../sharedSchemes/dto/create-temp.dto';

@Injectable()
export class ReadingService {

  constructor(@InjectModel('TempReading') private readonly tempReadingModel: Model<TempReading>) { }


  async addTemp(data: CreateTempDTO) {
    const newTemp = await new this.tempReadingModel(data);
    newTemp.save();
  }


}
