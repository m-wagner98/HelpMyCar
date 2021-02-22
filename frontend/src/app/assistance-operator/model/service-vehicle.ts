import {Response} from 'src/app/shared/model/ApiResponse';

export interface ServiceVehicle {
  vin: string;
  type: string;
  available: boolean;
  carData: Response;
  distance?: number;
}
