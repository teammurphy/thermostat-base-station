import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ReadingModule } from './reading/reading.module';
import { ConfigModule } from '@nestjs/config';
import { TemperaturesModule } from './temperatures/temperatures.module';


@Module({
  imports: [ConfigModule.forRoot(), MongooseModule.forRoot(process.env.DATABASE_URL, { useFindAndModify: false }), ReadingModule, TemperaturesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
