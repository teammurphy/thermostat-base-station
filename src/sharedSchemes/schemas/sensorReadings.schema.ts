import * as mongoose from 'mongoose';

export const SensorReadingsSchema = new mongoose.Schema({
    sensor_id: {type: Number, unique: true},
    sensor_name: String,
    timestamp: Date,
    temperature: Number
},
{ collection: 'sensorReadings'})