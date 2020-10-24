import * as mongoose from 'mongoose';

import {SetTempsSchema} from './setTemps.schema'

export const ZoneSettingsSchema = new mongoose.Schema({
  zone_number: { type: Number, unique: true },
  zone_name: String,
  high_set: Number,
  low_set: Number,
  set_temps: [SetTempsSchema],
  thermo_ids: [Number]

},
  { collection: 'zoneSettings' })
