import { Controller, Get, Param } from '@nestjs/common';
import { TemperaturesService } from './temperatures.service';

@Controller('temperatures')
export class TemperaturesController {
  constructor(private temperaturesService: TemperaturesService) { }
  @Get()
  async getReading() {
    return { "hi": 'hello world' }
  }

  @Get('/home')
  async readHomeInfo(): Promise<JSON[]>{
    return this.temperaturesService.getHomeInfo()

  }

  @Get('/all')
  async getAllReading() {
    return this.temperaturesService.getTemps();
  }

  @Get('/all/settings')
  async getAllSettings() {
    return this.temperaturesService.getAllSettings();
  }

  @Get('/zones')
  async readZones():Promise<number[]>{
    return this.temperaturesService.getZoneNumbers();

  }

  @Get('zone/:zone_num')
  async readZoneInfo(@Param('zone_num') zone_num: number):Promise<any>{
    return this.temperaturesService.getZoneInfo(zone_num)
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
