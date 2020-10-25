import { Document } from 'mongoose';

export interface SetTemps extends Document {
    readonly set_temp: number,
    readonly start_time:number,
    readonly end_time: number
}