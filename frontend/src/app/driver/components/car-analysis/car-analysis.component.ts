import {Component, OnInit} from '@angular/core';
import {VehicleInformationService} from '../../../shared/services/vehicle-information.service';
import {ApiResponse} from '../../../shared/model/ApiResponse';
import {LoginService} from '../../services/login.service';
import {Driver} from '../../../shared/model/Driver';


@Component({
  selector: 'app-car-analysis',
  templateUrl: './car-analysis.component.html',
  styleUrls: ['./car-analysis.component.scss']
})
export class CarAnalysisComponent implements OnInit {

  vehicleInfo: ApiResponse;

  constructor(
    private vehicleInfoService: VehicleInformationService,
    private logInService: LoginService
  ) {
  }

  driver: Driver;
  selectedVIN: string;

  ngOnInit(): void {
    this.getVehicleAndDriverInfo();
    // set default vin
    if (this.driver) {
      this.selectedVIN = this.vehicleInfoService.getSelectedVin();
    }

  }

  getVehicleAndDriverInfo(): void {
    this.vehicleInfoService.getVehicleInformation().subscribe((response) => {
      this.vehicleInfo = response;
    });
    this.driver = this.logInService.getDriverInfo();
  }

  getDataPositionFromVehicleInfoList(vin: string): number {
    for (let i = 0; i < this.vehicleInfo.inVehicleData.length; i++) {
      if (vin === this.vehicleInfo.inVehicleData[i].identifier.value) {
        return i;
      }
    }
    throw new Error('No matching vin');
  }
}
