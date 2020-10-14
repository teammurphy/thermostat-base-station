import { Controller, Get } from '@nestjs/common';

@Controller('temperatures')
export class TemperaturesController {
  @Get()
  async getReadings() {
    console.log("got request")
    return "hello world"
  }


}
