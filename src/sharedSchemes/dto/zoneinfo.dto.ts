export class zoneinfoDTO{
    zone_number: number;
    zone_name: string;
    current_temp: number;
    set_temp: number;
    low_set: number;
    high_set: number;

    public static createDTO(zone_setting, current_temp){
        const newDTO = new zoneinfoDTO();
        newDTO.zone_number = zone_setting.zone_number;
        newDTO.zone_name = zone_setting.zone_name;
        newDTO.set_temp = zone_setting.set_temp;
        newDTO.low_set = zone_setting.low_set;
        newDTO.high_set = zone_setting.high_set;

        newDTO.current_temp = current_temp;
        return newDTO;
    }
}