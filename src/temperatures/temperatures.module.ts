import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ReadingSchema } from '../sharedSchemes/schemas/reading.schema';
import { SettingsSchema } from '../sharedSchemes/schemas/settings.schema';
import { SetTempsSchema } from '../sharedSchemes/schemas/setTemp.schema'
import { TemperaturesController } from './temperatures.controller';
import { TemperaturesService } from './temperatures.service';

@Module({

  imports: [
    MongooseModule.forFeature([{ name: 'TempReading', schema: ReadingSchema }, { name: 'Settings', schema: SettingsSchema }, {name: 'SetTemps', schema:SetTempsSchema}])],
  controllers: [TemperaturesController],
  providers: [TemperaturesService]
})
export class TemperaturesModule { }
