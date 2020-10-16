import { Controller, Get } from '@nestjs/common';
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


}
