import { Injectable } from '@angular/core';
import { ApiResponse } from 'src/app/shared/model/ApiResponse';
import { HttpClient } from '@angular/common/http';
import { LoginService } from '../../driver/services/login.service';
import { ServiceVehicle } from 'src/app/assistance-operator/model/service-vehicle';
import { Observable } from 'rxjs';
import { publishReplay, refCount } from 'rxjs/operators';
import { GlobalConstants } from '../GlobalConstants';

@Injectable({
  providedIn: 'root'
})
export class VehicleInformationService {

  private url = GlobalConstants.apiURL + '/';
  private selectedVin: string;
  private updatedServiceVehicles: ServiceVehicle[] = []; // gets updated when availability of a service vehicle
  private serviceVehicles: Observable<ServiceVehicle[]> = null;


  constructor(
    private http: HttpClient,
    private loginService: LoginService
  ) {
  }

  /**
   * Get the vehicle information for all cars of the logged in user.
   */
  getVehicleInformation(): Observable<ApiResponse> {
    const driver = this.loginService.getDriverInfo();
    if (driver === undefined) {
      return new Observable<any>();
    }
    const username = driver.user;
    return this.http.get<ApiResponse>(`${this.url}getVehicleInformation?user=${username}`);
  }

  /**
   * Gets all defined service vehicles from the backend.
   * The http response gets cached because multiple components call this method.
   */
  getAllServiceVehicles(): Observable<ServiceVehicle[]> {
    if (!this.serviceVehicles) {
      this.serviceVehicles = this.http.get<ServiceVehicle[]>(`${this.url}getAllServiceVehicles`)
        .pipe(publishReplay(1), refCount());
    }
    return this.serviceVehicles;
  }

  /**
   * Updates the availability of a Service vehicle.
   * @param id help request id
   * @param vin virtual identification number
   */
  updateAvailability(id: number, vin: string): Observable<ServiceVehicle> {
    return this.http.get<ServiceVehicle>(`${this.url}updateAvailability?reqId=${id}&vin=${vin}`);
  }

  /**
   * Get the service vehicle which is assigned to a help request.
   * @param id help request id
   */
  getAssignedServiceVehicle(id: number): Observable<ServiceVehicle> {
    return this.http.get<ServiceVehicle>(`${this.url}getAssignedServiceVehicle?reqId=${id}`);
  }

  /**
   * Set the currently selected vin, so other components know for which car to display information.
   * @param vin virtual identification number
   */
  setSelectedVin(vin: string) {
    this.selectedVin = vin;
  }

  /**
   * Get the currently selected vehicle.
   */
  getSelectedVin(): string {
    return this.selectedVin;
  }

  setUpdatedServiceVehicles(vehicles: ServiceVehicle[]) {
    this.updatedServiceVehicles = vehicles;
  }

  checkIfServiceVehicleIsAvailable(vin: string) {
    for (const serviceVehicle of this.updatedServiceVehicles) {
      if (vin === serviceVehicle.vin) {
        return serviceVehicle.available;
      }
    }
    throw new Error('No matching vin');
  }

}
