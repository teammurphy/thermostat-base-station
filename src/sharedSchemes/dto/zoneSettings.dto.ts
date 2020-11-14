export class ZoneSettingsDTO {
  zone_number: number;
  zone_name: string;
  current_temp: number;
  high_set: number;
  low_set: number;
  set_temp: number;
  sensor_ids: number[];

  public static createDTO(
    zone_setting,
    current_temp: number,
    set_temp: number,
  ) {
    const newDTO = new ZoneSettingsDTO();

    newDTO.zone_number = zone_setting.zone_number;
    newDTO.zone_name = zone_setting.zone_name;
    newDTO.low_set = zone_setting.low_set;
    newDTO.high_set = zone_setting.high_set;

    newDTO.set_temp = set_temp;
    newDTO.current_temp = current_temp;
    return newDTO;
  }
}
