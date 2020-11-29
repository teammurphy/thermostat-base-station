export class SetTempsDTO {
  zone_number: number;
  set_temp: number;
  start_time: number;
  expireAt: Date;
}

export class BasicSetTempsDTO {
  set_temp: number;
  start_time: number;
  zone_number: number;

  public static createDTO(zone_number: number, set_temp) {
    const newDTO = new BasicSetTempsDTO();

    newDTO.zone_number = zone_number;
    newDTO.start_time = set_temp.startTime;
    newDTO.set_temp = set_temp.setTemp;
    return newDTO;
  }
}
