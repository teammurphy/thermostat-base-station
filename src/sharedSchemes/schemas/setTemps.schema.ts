import * as mongoose from 'mongoose';

export const SetTempsSchema = new mongoose.Schema({
    set_temp: Number,
    start_time: Number,
    end_time: Number
})