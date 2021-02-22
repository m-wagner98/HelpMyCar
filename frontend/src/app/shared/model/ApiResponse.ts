export interface ApiResponse {
  version: string;
  deliveredAt: Date;
  inVehicleData: InVehicleData[];
}

export interface InVehicleData {
  identifier: Identifier;
  response: Response;
  error: Error;
}

export interface Error {
  code: string;
  message: string;
}

export interface Identifier {
  type: string;
  value: string;
}

export interface Response {
  dtc: Dtc;
  geolocation: Geolocation;
  checkControlMessages: CheckControlMessages;
  basicVehicleData: BasicVehicleData;
}

export interface CheckControlMessages {
  error: Error;
  dataPoint: DataPoint;
}

export interface BasicVehicleData {
  error: Error;
  dataPoint: DataPoint;
}

export interface Dtc {
  error?: Error;
  dataPoint: DataPoint;
}

export interface Geolocation {
  error: Error;
  dataPoint: DataPoint;
}

export interface DataPoint {
  geoSystem?: string;
  latitude?: number;
  timestamp?: string;
  longitude?: number;
  value?: Value[];
}

export interface Value {
  dtcs?: TroubleCode[];
  status?: string;
  message?: string;
  value?: number;
  vehicleSoftware?: string;
  seatingCapacity?: number;
  productionDate?: string;
  registrationFirstDate?: string;
  registrationCountry?: string;
  brandName?: string;
  modelName?: string;
  bodyType?: string;
  colorText?: string;
  colorCode?: string;
  vehicleConfiguration?: string[];
}


export interface TroubleCode {
  dtcId: string;
  ecuId: string;
  occurrences: number;
  timestamp: string;
}
