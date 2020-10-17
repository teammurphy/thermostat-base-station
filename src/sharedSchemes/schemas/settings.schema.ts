import * as mongoose from 'mongoose';

export const SettingsSchema = new mongoose.Schema({
  zone_number: { type: Number, unique: true },
  zone_name: String,
  high_set: Number,
  low_set: Number,
  set_temp: Number,
  thermo_ids: [Number]

},
  { collection: 'settings' })
