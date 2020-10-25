import { Document } from 'mongoose';


export interface SensorReadings extends Document{
    readonly sensor_id: number,
    readonly sensor_name: string,
    readonly timestamp: Date,
    readonly temperature: number
}