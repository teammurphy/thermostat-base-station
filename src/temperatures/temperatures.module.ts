import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ReadingSchema } from '../sharedSchemes/schemas/reading.schema';
import { TemperaturesController } from "./temperatures.controller";
import { TemperaturesService } from "./temperatures.service";

@Module({

  imports: [
    MongooseModule.forFeature([{ name: 'TempReading', schema: ReadingSchema }])
  ],
  controllers: [TemperaturesController],
  providers: [TemperaturesService]
})
export class TemperaturesModule { }
