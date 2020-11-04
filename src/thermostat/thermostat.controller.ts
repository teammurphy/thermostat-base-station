import { Controller, Get, Put, Query, Body } from '@nestjs/common';
import { ZoneSettingsDTO } from 'src/sharedSchemes/dto/zoneSettings.dto';
import { ThermostatService } from './thermostat.service';

@Controller('thermostat')
export class ThermostatController {
  constructor(private thermostatService: ThermostatService) {}

  @Get()
  async helloThermostat() {
    return { hello: 'thermostat' };
  }

  @Get('/home')
  async readHomeInfo(): Promise<ZoneSettingsDTO[]> {
    return this.thermostatService.getHomeInfo();
  }

  @Put('/addSensors')
  async addSensors(
    @Query('zone_num') zone_num: number,
    @Body() body: [number],
  ): Promise<ZoneSettingsDTO> {
    return this.thermostatService.addSensorsToZone(zone_num, body);
  }

  @Put('/bumpSetTemp')
  async updateSetTemp(
    @Query('zone_num') zone_num: number,
    @Body() body: JSON,
  ): Promise<ZoneSettingsDTO> {
    console.log(body);
    return this.thermostatService.bumpSetTemp(zone_num, body);
  }

  @Put('/updateHighSet')
  async updateHighSet(
    @Query('zone_num') zone_num: number,
    @Body() body: JSON,
  ): Promise<ZoneSettingsDTO> {
    return this.thermostatService.editHighSet(zone_num, body);
  }

  @Put('/updateLowSet')
  async updateLowSet(
    @Query('zone_num') zone_num: number,
    @Body() body: JSON,
  ): Promise<ZoneSettingsDTO> {
    return this.thermostatService.editLowSet(zone_num, body);
  }
}
