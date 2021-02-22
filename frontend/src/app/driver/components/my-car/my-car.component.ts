import {Component, OnInit} from '@angular/core';

import {VehicleInformationService} from 'src/app/shared/services/vehicle-information.service';
import {LoginService} from '../../services/login.service';
import {ApiResponse} from 'src/app/shared/model/ApiResponse';
import {Driver} from 'src/app/shared/model/Driver';

@Component({
  selector: 'app-my-car',
  templateUrl: './my-car.component.html',
  styleUrls: ['./my-car.component.scss']
})
export class MyCarComponent implements OnInit {
  constructor(
    private vehicleInfoService: VehicleInformationService,
    private logInService: LoginService
  ) {
  }

  // wenn die html fertig is hier aufräumen

  vehicleInfo: ApiResponse;
  driver: Driver;
  selectedVIN: string;

  ngOnInit(): void {
    this.getVehicleAndDriverInfo();
    if (this.driver) {
      this.selectedVIN = this.driver.vinList[0];
    }

  }

  getVehicleAndDriverInfo(): void {
    this.vehicleInfoService.getVehicleInformation().subscribe((response) => {
      this.vehicleInfo = response;
    });
    this.driver = this.logInService.getDriverInfo();
  }

  getDataPositionInVehicleInfoList(): number {
    for (let i = 0; i < this.vehicleInfo.inVehicleData.length; i++) {
      if (this.selectedVIN === this.vehicleInfo.inVehicleData[i].identifier.value) {
        return i;
      }
    }
    throw new Error('No matching vin');
  }

  setSelectedVIN(vin: string) {
    this.selectedVIN = vin;
  }

}
