import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { SensorReading } from '../sharedSchemes/interfaces/sensorReading.interface';
import { CreateSensorReadingDTO } from '../sharedSchemes/dto/sensorReading.dto';


@Injectable()
export class SensorReadingService {

  constructor(@InjectModel('SensorReading') private readonly sensorReadingModel: Model<SensorReading>) { }


  async addTemp(data: CreateSensorReadingDTO) {
    const newTemp = await new this.sensorReadingModel(data);
    newTemp.save();
  }


}
