import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SensorReadingsSchema } from '../sharedSchemes/schemas/sensorReadings.schema';
import { ZoneSettingsSchema } from '../sharedSchemes/schemas/zoneSetings.schema';
import { SetTempsSchema } from '../sharedSchemes/schemas/setTemps.schema';
import { ThermostatController } from './thermostat.controller';
import { ThermostatService } from './thermostat.service';

@Module({

    imports:[ MongooseModule.forFeature([
    {name: 'SetTemps', schema: SetTempsSchema}, 
    {name: 'ZoneSettings', schema: ZoneSettingsSchema}, 
    {name: 'SensorReadings', schema: SensorReadingsSchema}])],
    controllers: [ThermostatController],
    providers:[ThermostatService]

})
export class ThermostatModule {}
