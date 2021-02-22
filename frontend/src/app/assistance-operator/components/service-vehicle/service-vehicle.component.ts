import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ServiceVehicle} from '../../model/service-vehicle';
import {MatDialog} from '@angular/material/dialog';
import {ConfirmServiceVehicleComponent} from '../confirm-service-vehicle/confirm-service-vehicle.component';
import {dialogConfig} from '../../../shared/model/DialogConfig';

@Component({
  selector: 'app-service-vehicle',
  templateUrl: './service-vehicle.component.html',
  styleUrls: ['./service-vehicle.component.scss']
})
export class ServiceVehicleComponent implements OnInit {
  @Input() serviceVehicle: ServiceVehicle;
  @Output() serviceVehicleConfirmed: EventEmitter<ServiceVehicle> = new EventEmitter<ServiceVehicle>();

  imgALT: string;
  imgSRC: string;


  constructor(
    public dialog: MatDialog
  ) {
  }

  ngOnInit(): void {
    if (this.serviceVehicle.type.includes('TOWING')) {
      this.imgALT = 'Towing Logo';
      this.imgSRC = 'assets/towing_logo.svg';
    } else {
      this.imgALT = 'OnSite Logo';
      this.imgSRC = 'assets/onsite_logo.svg';
    }
  }

  openConfirmServiceVehicleDialog(): void {
    const dialogRef = this.dialog.open(ConfirmServiceVehicleComponent, dialogConfig);
    dialogRef.componentInstance.serviceVehicleConfirmed.subscribe(() => {
      this.serviceVehicleConfirmed.emit(this.serviceVehicle);
    });
  }
}
