import { Controller, Get } from '@nestjs/common';

@Controller('temperatures')
export class TemperaturesController {
  @Get()
  async getReadings() {
    return "hello world"
  }


}
