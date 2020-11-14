import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { SensorReadingModule } from './reading/sensorReading.module';
import { ThermostatModule } from './thermostat/thermostat.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.DATABASE_URL, {
      useFindAndModify: false,
      useNewUrlParser: true,
      useCreateIndex: true,
    }),
    SensorReadingModule,
    ThermostatModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
