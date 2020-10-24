import { Document } from 'mongoose';


export interface SensorReading extends Document{
    sensor_id: number,
    sensor_name: string,
    timestamp: Date,
    temperature: number
}