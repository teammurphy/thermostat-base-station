import { Document } from 'mongoose';

export interface Settings extends Document {
  readonly zone: number,
  readonly set_upper: number,
  readonly set_lower: number,
  readonly set_temp: number
  readonly thermo_ids: [number]
}
