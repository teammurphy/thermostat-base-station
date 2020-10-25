import { Document } from 'mongoose';
import { SetTemps } from './setTemps.interface';

export interface ZoneSettings extends Document {
  readonly zone_number: number,
  readonly zone_name: string,
  readonly high_set: number,
  readonly low_set: number,
  readonly set_temps: SetTemps[],
  readonly thermo_ids: number[]
}
