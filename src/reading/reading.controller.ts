import { Controller } from '@nestjs/common';
import { ReadingService } from './reading.service';
import { CreateTempDTO } from './dto/create-temp.dto';
import { EventPattern, MqttContext, Ctx, MessagePattern } from '@nestjs/microservices'

@Controller('reading')
export class ReadingController {

  constructor(private readingService: ReadingService) { }

  @EventPattern('new_reading')
  async newReading(data: CreateTempDTO) {
    this.readingService.addTemp(data);
  }
}
