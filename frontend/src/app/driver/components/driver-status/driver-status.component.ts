import { Component, OnDestroy, OnInit } from '@angular/core';
import { StatusService } from 'src/app/shared/services/status.service';
import { ChatService } from 'src/app/shared/services/chat.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { VehicleInformationService } from 'src/app/shared/services/vehicle-information.service';
import { ApiResponse } from 'src/app/shared/model/ApiResponse';
import { ControlMessageService } from '../../services/controlMessage.service';

@Component({
  selector: 'app-driver-status',
  templateUrl: './driver-status.component.html',
  styleUrls: ['./driver-status.component.scss']
})
export class DriverStatusComponent implements OnInit, OnDestroy {

  public status: string;
  public highlighted: string[] = ['', '', '', ''];
  public showBackButton: boolean;
  public nrOfNewMessages = 0;
  private subscriptions: Subscription[] = [];
  public vehicleInfo: ApiResponse;
  public isAlreadySelected: boolean[];

  constructor(
    private statusService: StatusService,
    private chatService: ChatService,
    private router: Router,
    private vehicleInformationService: VehicleInformationService,
    private controlMessageService: ControlMessageService
  ) {
  }

  ngOnInit(): void {
    this.statusService.listenForChanges();

    const selectedVin = this.vehicleInformationService.getSelectedVin();
    this.vehicleInformationService.getVehicleInformation().subscribe(vehicleInfo => {
      vehicleInfo.inVehicleData = vehicleInfo.inVehicleData.filter(vehicleData => vehicleData.identifier.value === selectedVin);
      this.vehicleInfo = vehicleInfo;
    });
    this.subscriptions.push(this.chatService.getMessagesObservable().subscribe(() => this.nrOfNewMessages++));
    this.subscriptions.push(this.statusService.getStatus().subscribe((status) => this.updateUI(status)));

  }

  ngOnDestroy(): void {
    this.unsubscribeAll();
  }

  unsubscribeAll(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  updateUI(status: string) {
    this.status = status;
    const highlightIndex = this.statusService.getIndex(this.status);
    if (highlightIndex >= 3) {
      this.showBackButton = true;
    }

    this.isAlreadySelected = new Array(highlightIndex + 1).fill(true);
  }

  getStatusTranslation(): string {
    return this.statusService.getTranslation(this.status);
  }

  getStatusIcon(): string {
    return this.statusService.getIcon(this.status);
  }

  goBack() {
    // unsubscribe before resetting the status otherwise it acts on the change which is not needed
    this.unsubscribeAll();
    // reset the status
    this.statusService.setStatus('OPEN');
    this.router.navigate(['driver', 'start-page']);
  }

  getCheckControlSignSvg(value: number) {
    return this.controlMessageService.getCheckControlIcon(value);
  }

  getControllMessageTitle(value: number) {
    return this.controlMessageService.getControlTitle(value);
  }
}
