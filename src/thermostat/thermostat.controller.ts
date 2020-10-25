import { Controller, Get } from '@nestjs/common';
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
}
