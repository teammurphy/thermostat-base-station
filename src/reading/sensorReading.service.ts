import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { SensorReadings } from '../sharedSchemes/interfaces/sensorReadings.interface';
import { CreateSensorReadingDTO } from '../sharedSchemes/dto/sensorReading.dto';


@Injectable()
export class SensorReadingService {

  constructor(@InjectModel('SensorReading') private readonly sensorReadingModel: Model<SensorReadings>) { }


  async addTemp(data: CreateSensorReadingDTO) {
    const newTemp = await new this.sensorReadingModel(data);
    newTemp.save();
  }


}
