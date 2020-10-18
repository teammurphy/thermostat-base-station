import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { TemperaturesService } from './temperatures.service';
import { CreateZoneDTO } from '../sharedSchemes/dto/create-zone.dto'
import { zoneinfoDTO } from 'src/sharedSchemes/dto/zoneinfo.dto';

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

  @Get('/getSetTemp/zone/:zone_num')
  async readSetTempbyZoneNum(@Param('zone_num') zone_num: number): Promise<number> {
    return this.temperaturesService.getSetTempbyZoneNum(zone_num);
  }

  @Get('/getTemp/zone/:zone_num')
  async readTempbyZoneNum(@Param('zone_num') zone_num: number): Promise<number> {
    return this.temperaturesService.getCurrentTempByZoneNum(zone_num);
  }

  @Post('/zone')
  async createZone(@Body() body: CreateZoneDTO): Promise<CreateZoneDTO>{
    return this.temperaturesService.createZone(body)
  }

  @Put('/addSensors/zone/:zone_num')
  async addSensors(@Param('zone_num') zone_num:number,@Body() body: [number]):Promise<zoneinfoDTO>{
    return this.temperaturesService.addSensorsToZone(zone_num, body)
  }

  @Put('/editZone/zone/:zone_num')
  async editZone(@Param('zone_num') zone_num:number, @Body() body: CreateZoneDTO):Promise<CreateZoneDTO>{
    return this.temperaturesService.editZone(zone_num, body)
  }

  @Put('/updateSetTemp/zone/:zone_num')
  async updateSetTemp(@Param('zone_num') zone_num:number, @Body() body:JSON):Promise<CreateZoneDTO>{
    return this.temperaturesService.editSetTemp(zone_num, body)
  }

  @Put('/updateHighTemp/zone/:zone_num')
  async updateHighSet(@Param('zone_num') zone_num:number, @Body() body:JSON):Promise<CreateZoneDTO>{
    return this.temperaturesService.editHighSet(zone_num, body)
  }

  @Put('/updateLowTemp/zone/:zone_num')
  async updateLowSet(@Param('zone_num') zone_num:number, @Body() body:JSON):Promise<CreateZoneDTO>{
    return this.temperaturesService.editLowSet(zone_num, body)
  }

  @Delete('/zone/:zone_num')
  async deleteZoneByNum(@Param('zone_num') zone_num: number):Promise<boolean>{
    return this.temperaturesService.deleteZone(zone_num)
  }
}
