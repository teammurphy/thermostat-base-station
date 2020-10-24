import { SetTemps } from "../interfaces/setTemps.interface";

export class CreateZoneDTO{
    readonly zone_number: number;
    readonly zone_name: string;
    readonly set_temps: SetTemps[];
    readonly low_set: number;
    readonly high_set: number;
}
