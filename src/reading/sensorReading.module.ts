import { Module } from '@nestjs/common';
import { SensorReadingController } from './sensorReading.controller';
import { SensorReadingService } from './sensorReading.service';
import { MongooseModule } from '@nestjs/mongoose';
import { SensorReadingSchema } from '../sharedSchemes/schemas/sensorReading.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'SensorReading', schema: SensorReadingSchema }])
  ],
  controllers: [SensorReadingController],
  providers: [SensorReadingService]
})
export class SensorReadingModule { }
