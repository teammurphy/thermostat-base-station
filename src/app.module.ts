import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ReadingService } from './reading/reading.service';
import { ReadingModule } from './reading/reading.module';
import { ConfigModule } from '@nestjs/config';

//console.log(database_url);

@Module({
  imports: [ConfigModule.forRoot(), MongooseModule.forRoot(process.env.DATABASE_URL), ReadingModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
