export interface Temperature {
  memberId: number;
  memberName: string;
  memberProfileImageUrl: string;
  previousTemperature: number;
  temperatureDifference: number;
  currentTemperature: number;
}

export interface TemperatureList {
  roomTemperatureDtoList: Temperature[];
}