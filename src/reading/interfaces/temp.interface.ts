import { Document } from 'mongoose';

export interface Temp extends Document {
  readonly thermo_id: number,
  readonly thermo_name: String,
  readonly time: Date,
  readonly temp: number
}
