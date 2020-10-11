import { Document } from 'mongoose';

export interface Temp extends Document {
  temper: String;
}
