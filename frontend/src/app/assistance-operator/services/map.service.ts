import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';
import {ServiceVehicle} from '../model/service-vehicle';

@Injectable({
  providedIn: 'root'
})
export class MapService {

  private selectedServiceVehicle = new Subject<ServiceVehicle>();
  private toggle = new Subject<string>();
  private mapSelect = new Subject<ServiceVehicle>();

  constructor() {
  }

  updateSelectedVehicle(vehicle: ServiceVehicle): void {
    this.selectedServiceVehicle.next(vehicle);
  }

  getSelectedVehicle() {
    return this.selectedServiceVehicle.asObservable();
  }

  updateToggle(criteria: string): void{
    this.toggle.next(criteria);
  }

  getToggle() {
    return this.toggle.asObservable();
  }

  updateMapSelect(serviceVehicle: ServiceVehicle): void {
    this.mapSelect.next(serviceVehicle);
  }

  getMapSelect() {
    return this.mapSelect.asObservable();
  }

}
