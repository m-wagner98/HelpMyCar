import {Component, OnInit} from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';
import {LoginService} from '../../services/login.service';
import {Driver} from 'src/app/shared/model/Driver';
import {Router} from '@angular/router';
import {HelpRequestService} from '../../services/help-request.service';
import {TestData} from '../../../shared/model/TestData/TestData';
import {VehicleInformationService} from 'src/app/shared/services/vehicle-information.service';
import {ApiResponse} from 'src/app/shared/model/ApiResponse';


@Component({
  selector: 'app-confirm-request',
  templateUrl: './confirm-request.component.html',
  styleUrls: ['./confirm-request.component.scss']
})
export class ConfirmRequestComponent implements OnInit {


  private driver: Driver = null; // TestData.DRIVER; // initialize with default value to make tests pass
  vinList: string[] = [];
  selectedVin: string = TestData.DRIVER.vinList[0];
  vehicleInfo: ApiResponse;
  dropdownOpen = false;

  constructor(
    private dialogRef: MatDialogRef<ConfirmRequestComponent>,
    private loginService: LoginService,
    private router: Router,
    private helpRequestService: HelpRequestService,
    private vehicleInformationService: VehicleInformationService,
  ) {
  }

  ngOnInit(): void {
    this.getVehicleAndDriverInfo();
    const selectedVin = this.vehicleInformationService?.getSelectedVin();
    // set default vin
    if (this.driver?.vinList.includes(selectedVin)) {
      this.selectedVin = selectedVin;
    } else {
      this.selectedVin = this.driver?.vinList[0];
      this.vehicleInformationService.setSelectedVin(this.driver?.vinList[0]);
    }
    this.vinList = this.driver?.vinList;
  }

  setSelectedVin(vin: string): void {
    this.selectedVin = vin;
    this.dropdownOpen = false;
  }

  getVehicleAndDriverInfo(): void {
    this.vehicleInformationService.getVehicleInformation().subscribe((response) => {
      this.vehicleInfo = response;
    });
    this.driver = this.loginService.getDriverInfo();
  }

  close(): void {
    this.dialogRef.close();
  }

  confirmRequest(): void {
    this.vehicleInformationService.setSelectedVin(this.selectedVin);
    this.helpRequestService.sendHelpRequest();
    this.dialogRef.close();
    this.router.navigate(['driver', 'status']);
  }

  getDataPositionInVehicleInfoList(): number {
    for (let i = 0; i < this.vehicleInfo.inVehicleData.length; i++) {
      if (this.selectedVin === this.vehicleInfo.inVehicleData[i].identifier.value) {
        return i;
      }
    }
    throw new Error('No matching vin');
  }

  filterSelectedVin(list: string[]) {
    return list.filter(t => t !== this.selectedVin);
  }
}
