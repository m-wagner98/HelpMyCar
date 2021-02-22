import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {ConfirmRequestComponent} from '../confirm-request/confirm-request.component';
import {Router} from '@angular/router';
import {VehicleInformationService} from 'src/app/shared/services/vehicle-information.service';
import {LoginService} from '../../services/login.service';
import {ApiResponse} from 'src/app/shared/model/ApiResponse';
import {Driver} from 'src/app/shared/model/Driver';
import {dialogConfig} from '../../../shared/model/DialogConfig';
import {ControlMessageService} from '../../services/controlMessage.service';


@Component({
  selector: 'app-start-page',
  templateUrl: './start-page.component.html',
  styleUrls: ['./start-page.component.scss']
})
export class StartPageComponent implements OnInit {

  public vehicleInfo: ApiResponse = null;
  public vinList: string[] = null;
  public left = 0;
  public isSelected: boolean[] = [];
  private driver: Driver;
  private selectedVin: string;
  private index: number;

  constructor(
    private router: Router,
    public dialog: MatDialog,
    private vehicleInformationService: VehicleInformationService,
    private loginService: LoginService,
    private controlMessageService: ControlMessageService
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
    this.isSelected = new Array(this.vinList?.length).fill(false);
    this.isSelected[0] = true;
    this.positionCarousel(this.selectedVin);
  }

  openConfirmRequestDialog(): void {
    this.dialog.open(ConfirmRequestComponent, dialogConfig);
  }

  getVehicleAndDriverInfo(): void {
    this.vehicleInformationService.getVehicleInformation().subscribe((response) => {
      this.vehicleInfo = response;
    });
    this.driver = this.loginService.getDriverInfo();
  }

  setSelectedVin(vin: string) {
    if (this.selectedVin === vin) {
      this.selectedVin = vin;
      this.vehicleInformationService.setSelectedVin(this.selectedVin);
      this.router.navigate(['driver', 'car-analysis']);
    } else {
      this.positionCarousel(vin);
      this.selectedVin = vin;
      this.vehicleInformationService.setSelectedVin(this.selectedVin);
    }
  }

  positionCarousel(target: string) {
    // calc vin position in array
    this.index = this.vinList?.findIndex(vin => vin === target);
    // set control styling
    this.isSelected = new Array(this.vinList?.length).fill(false);
    this.isSelected[this.index] = true;
    // calc position
    this.left = -76 * this.index;
  }

  getCheckControlSignSvg(value: number) {
    return this.controlMessageService.getCheckControlIcon(value);
  }

  getControlMessageTitle(value: number) {
    return this.controlMessageService.getControlTitle(value);
  }
}
