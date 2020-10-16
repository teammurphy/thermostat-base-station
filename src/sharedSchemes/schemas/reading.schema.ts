import * as mongoose from 'mongoose';

export const ReadingSchema = new mongoose.Schema({
  thermo_id: Number,
  thermo_name: String,
  time: Date,
  temp: Number
},
  { collection: 'tempreadings' })
