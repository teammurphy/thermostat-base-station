import { Document } from 'mongoose';

export interface TempReading extends Document {
  readonly thermo_id: number,
  readonly thermo_name: String,
  readonly date: Date,
  readonly temp: number
}
