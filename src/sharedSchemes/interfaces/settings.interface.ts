import { Document } from 'mongoose';

export interface Settings extends Document {
  readonly zone_number: number,
  readonly zone_name: string,
  readonly high_set: number,
  readonly low_set: number,
  readonly set_temp: number
  readonly thermo_ids: [number]
}
