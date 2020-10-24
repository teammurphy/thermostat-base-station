import { Controller } from '@nestjs/common';
import { SensorReadingService } from './sensorReading.service';
import { CreateSensorReadingDTO } from '../sharedSchemes/dto/sensorReading.dto';
import { EventPattern } from '@nestjs/microservices'

@Controller('sensorreading')
export class SensorReadingController {

  constructor(private readingService: SensorReadingService) { }

  @EventPattern('new_reading')
  async newReading(data: CreateSensorReadingDTO) {
    this.readingService.addTemp(data);
  }
}
