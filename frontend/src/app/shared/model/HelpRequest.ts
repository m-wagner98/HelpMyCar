import {Driver} from './Driver';
import {ApiResponse} from './ApiResponse';

export interface HelpRequest {
  driver: Driver;
  apiResponse: ApiResponse;
  status: string;
  id: number;
  createdAt: string;
}
