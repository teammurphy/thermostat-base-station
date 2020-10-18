import { Document } from 'mongoose';

export interface Settings extends Document {
  zone_number: number,
  zone_name: string,
  high_set: number,
  low_set: number,
  set_temp: number
  thermo_ids: [number]
}
