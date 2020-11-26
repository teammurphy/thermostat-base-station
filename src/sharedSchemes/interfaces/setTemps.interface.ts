import { Document } from 'mongoose';

export interface SetTemps extends Document {
  zone_number: number;
  set_temp: number;
  start_time: number;
  expireAt: Date;
}
