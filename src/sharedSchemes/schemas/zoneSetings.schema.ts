import * as mongoose from 'mongoose';

export const ZoneSettingsSchema = new mongoose.Schema(
  {
    zone_number: { type: Number, unique: true },
    zone_name: String,
    high_set: Number,
    low_set: Number,
    sensor_ids: [Number],
  },
  { collection: 'zoneSettings' },
);
