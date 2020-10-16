import { Controller, Get, Param } from '@nestjs/common';
import { TemperaturesService } from './temperatures.service';

@Controller('temperatures')
export class TemperaturesController {
  constructor(private temperaturesService: TemperaturesService) { }
  @Get()
  async getReading() {
    console.log("got request")
    return { "hi": 'hello world' }
  }

  @Get('/all')
  async getAllReading() {
    console.log('all')
    return this.temperaturesService.getTemps();
  }

  @Get('/all/settings')
  async getAllSettings() {
    return this.temperaturesService.getAllSettings()
  }

  @Get('/setTemp/zone/:zone_num')
  async readSetTempbyZoneNum(@Param('zone_num') zone_num: number): Promise<number> {
    return this.temperaturesService.getSetTempbyZoneNum(zone_num);
  }

  @Get('/getTemp/zone/:zone_num')
  async readTempbyZoneNum(@Param('zone_num') zone_num: number): Promise<number> {
    return this.temperaturesService.getCurrentTempByZoneNum(zone_num);
  }
}
