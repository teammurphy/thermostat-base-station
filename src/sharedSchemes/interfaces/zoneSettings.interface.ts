import { Document } from 'mongoose';

export interface ZoneSettings extends Document {
  zone_number: number;
  zone_name: string;
  high_set: number;
  low_set: number;
  sensor_ids: number[];
}
