export class CreateSensorReadingDTO {
    readonly sensor_id: number;
    readonly sensor_name: string;
    readonly timestamp: Date;
    readonly temperature: number;
}