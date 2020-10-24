import { Test, TestingModule } from '@nestjs/testing';
import { SensorReadingService } from './sensorReading.service';

describe('ReadingService', () => {
  let service: SensorReadingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SensorReadingService],
    }).compile();

    service = module.get<SensorReadingService>(SensorReadingService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
