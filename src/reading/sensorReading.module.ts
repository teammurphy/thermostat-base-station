import { Module } from '@nestjs/common';
import { SensorReadingController } from './sensorReading.controller';
import { SensorReadingService } from './sensorReading.service';
import { MongooseModule } from '@nestjs/mongoose';
import { SensorReadingsSchema } from '../sharedSchemes/schemas/sensorReadings.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'SensorReading', schema: SensorReadingsSchema }])
  ],
  controllers: [SensorReadingController],
  providers: [SensorReadingService]
})
export class SensorReadingModule { }
