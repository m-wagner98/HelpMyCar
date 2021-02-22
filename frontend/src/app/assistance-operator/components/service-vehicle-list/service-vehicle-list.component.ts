import {Component, Input, OnInit} from '@angular/core';
import {ServiceVehicle} from '../../model/service-vehicle';
import {VehicleInformationService} from 'src/app/shared/services/vehicle-information.service';
import {HelpRequest} from '../../../shared/model/HelpRequest';
import {HelpRequestInformationService} from '../../services/help-request-information.service';
import {StatusService} from '../../../shared/services/status.service';
import {DistanceGeoCodingService} from '../../../shared/services/distance-geo-coding.service';
import {MapService} from '../../services/map.service';
import {skip, take} from 'rxjs/operators';

@Component({
  selector: 'app-service-vehicle-list',
  templateUrl: './service-vehicle-list.component.html',
  styleUrls: ['./service-vehicle-list.component.scss']
})
export class ServiceVehicleListComponent implements OnInit {

  public assignedServiceVehicle: ServiceVehicle;
  public criteria = '';
  public serviceVehicles: ServiceVehicle[] = [];

  public imgALT = '';
  public imgSRC = '';

  public selected = {};

  private id: number;
  public helpRequest: HelpRequest;


  /** Uses the input from the parent component to get the corresponding help request from the help request information service
   *  and updates this component to the current help request.
   */
  @Input('id') set _id(value: number) {
    this.selected = {};
    this.id = value;
    this.helpRequest = this.helpRequestInformationService.getRequest(this.id);
    if (this.serviceVehicles.length !== 0) {
      this.sortByDistances();
      this.getAssignedServiceVehicle();
    }
  }

  constructor(
    private vehicleInformationService: VehicleInformationService,
    private helpRequestInformationService: HelpRequestInformationService,
    private statusService: StatusService,
    private distanceService: DistanceGeoCodingService,
    private mapService: MapService
  ) {
  }


  ngOnInit(): void {
    this.subscribeToMapSelect();
    this.vehicleInformationService.getAllServiceVehicles().subscribe((response: ServiceVehicle[]) => {
      this.serviceVehicles = response;
      this.vehicleInformationService.setUpdatedServiceVehicles(this.serviceVehicles);
      this.sortByDistances();
      this.getAssignedServiceVehicle();
    });
  }

  subscribeToMapSelect() {
    this.mapService.getMapSelect().subscribe((serviceVehicle) => {
      if (serviceVehicle === undefined) {
        this.selected = {};
        this.criteria = '';
        this.mapService.updateSelectedVehicle(undefined);
      } else {
        this.onSelectVehicleInList(serviceVehicle);
      }
    })
  }

  toggleTowing(): void {
    this.toggle('TOWING_VEHICLE');
  }

  toggleOnSite(): void {
    this.toggle('ON_SITE_VEHICLE');
  }

  private toggle(criteria: string): void {
    this.selected = {};
    if (this.criteria === criteria) {
      this.criteria = '';
      this.mapService.updateSelectedVehicle(undefined);
    } else {
      this.criteria = criteria;
      this.mapService.updateToggle(criteria);
    }
  }


  sortByDistances(): void {
    this.serviceVehicles.forEach(t => {
      t.distance = this.distanceService.calculateDistance(
        this.helpRequest.apiResponse.inVehicleData[0].response.geolocation.dataPoint,
        t.carData.geolocation.dataPoint);
    });
    this.serviceVehicles = this.serviceVehicles.sort((n1, n2) => {
      if (n1.distance > n2.distance) {
        return 1;
      }
      if (n1.distance < n2.distance) {
        return -1;
      }
      return 0;
    });
  }

  /**  Gets the assigned service vehicle from the Backend via the vehicleInformationService.
   *   Also uses the map service to update the markers on the map.
   */
  getAssignedServiceVehicle(): void {
    if (this.helpRequest.status === 'SERVICE_VEHICLE_ON_THE_WAY' ||
      this.helpRequest.status === 'CLOSED') {
      this.vehicleInformationService.getAssignedServiceVehicle(this.id).subscribe((assignedServiceVehicle: ServiceVehicle) => {
        this.assignServiceVehicle(assignedServiceVehicle);
        this.mapService.updateSelectedVehicle(assignedServiceVehicle);
      });
    } else {
      this.mapService.updateSelectedVehicle(undefined);
    }
  }

  /**
   * Assigns the given service vehicle and calculates its distance to the customer
   * @param vehicle that gets assigned
   */
  assignServiceVehicle(vehicle: ServiceVehicle): void {
    this.assignedServiceVehicle = vehicle;
    this.assignedServiceVehicle.distance = this.distanceService.calculateDistance(
      this.helpRequest.apiResponse.inVehicleData[0].response.geolocation.dataPoint,
      this.assignedServiceVehicle.carData.geolocation.dataPoint);
    this.getLogo();
  }

  getLogo() {
    if (this.assignedServiceVehicle.type.includes('TOWING')) {
      this.imgALT = 'Towing Logo';
      this.imgSRC = 'assets/towing_logo.svg';
    } else {
      this.imgALT = 'OnSite Logo';
      this.imgSRC = 'assets/onsite_logo.svg';
    }
  }


  /**
   * Updates an observable to transmit the currently selected vehicle to the map component.
   * @param vehicle that is currently selected
   */
  onSelectVehicleInList(vehicle: ServiceVehicle) {
    this.selected = vehicle;
    this.mapService.updateSelectedVehicle(vehicle);
  }

  serviceVehicleConfirmedEvent(serviceVehicle: ServiceVehicle): void {
    this.updateServiceVehicleAvailability(serviceVehicle);
    // updates the map after the status has updated (time may vary due to polling).
    // skips 1 because the behavior subject returns the current status directly after subscribing, which is not needed.
    this.statusService.getStatus().pipe(skip(1), take(1)).subscribe(() => {
      this.mapService.updateSelectedVehicle(serviceVehicle);
    });
  }

  mechanicArrived(): void {
    this.statusService.updateStatus(this.id);
    this.updateServiceVehicleAvailability(this.assignedServiceVehicle);

  }

  /**
   * Notifies the backend via the vehicle information service that the availability of a service vehicle
   * has changed. Updates this service vehicles after getting a response with the updated service vehicle.
   * Also updates the Service Vehicle array in the vehicle information service.
   * @param serviceVehicle whose availability changed
   */
  updateServiceVehicleAvailability(serviceVehicle: ServiceVehicle): void {
    const vin = serviceVehicle.vin;
    this.vehicleInformationService.updateAvailability(this.id, vin).subscribe((updatedServiceVehicle: ServiceVehicle) => {
      this.serviceVehicles.forEach((vehicle, i) => {
        if (vehicle.vin === vin) {
          this.serviceVehicles[i] = updatedServiceVehicle;
        }
      });
      this.assignServiceVehicle(updatedServiceVehicle);
      this.vehicleInformationService.setUpdatedServiceVehicles(this.serviceVehicles);
    });
  }

}
