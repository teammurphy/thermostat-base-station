import * as mongoose from 'mongoose';

export const SetTempsSchema = new mongoose.Schema(
  {
    zone_number: Number,
    set_temp: Number,
    start_time: Number,
    expireAt: Date,
  },
  { timestamps: true, collection: 'setTemps' },
);
SetTempsSchema.index({ expireAt: 1 }, { expireAfterSeconds: 0 });
