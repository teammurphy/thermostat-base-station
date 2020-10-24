import { Controller, Get } from '@nestjs/common';
import { ThermostatService } from './thermostat.service'

@Controller('thermostat')
export class ThermostatController {
    constructor (private thermostatService: ThermostatService){}

    @Get()
    async helloThermostat(){
        return { "hello": "thermostat"}
    }

    @Get()
    async readHomeInfo(): Promise<JSON[]>{
        return this.thermostatService.getHomeInfo()
    }
}
