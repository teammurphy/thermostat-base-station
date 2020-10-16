import * as mongoose from 'mongoose';

export const SettingsSchema = new mongoose.Schema({
  zone: { type: Number, unique: true },
  set_upper: Number,
  set_lower: Number,
  set_temp: Number,
  thermo_ids: [Number]

},
  { collection: 'settings' })
