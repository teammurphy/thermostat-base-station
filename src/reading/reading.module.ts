import { Module } from '@nestjs/common';
import { ReadingController } from './reading.controller';
import { ReadingService } from './reading.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ReadingSchema } from '../sharedSchemes/schemas/reading.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Temp', schema: ReadingSchema }])
  ],
  controllers: [ReadingController],
  providers: [ReadingService]
})
export class ReadingModule { }
