import { Document } from 'mongoose';
import { SetTemps } from './setTemps.interface';

export interface Settings extends Document {
  zone_number: number,
  zone_name: string,
  high_set: number,
  low_set: number,
  set_temps: SetTemps[],
  thermo_ids: [number]
}
