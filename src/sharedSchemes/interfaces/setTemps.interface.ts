import { Document } from 'mongoose';

export interface SetTemps extends Document {
    set_temp: number,
    start_time:number,
    end_time: number
}