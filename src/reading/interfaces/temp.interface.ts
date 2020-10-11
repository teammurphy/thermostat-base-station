import { Document } from 'mongoose';

export interface Temp extends Document {
  thermo_id: number,
  thermo_name: String,
  time: Date,
  temp: number
}
