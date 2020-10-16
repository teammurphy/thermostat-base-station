import * as mongoose from 'mongoose';

export const SettingsSchema = new mongoose.Schema({
  zone: Number,
  set_upper: Number,
  set_lower: Number,
  set_temp: Number
},
  { collection: 'settings' })
