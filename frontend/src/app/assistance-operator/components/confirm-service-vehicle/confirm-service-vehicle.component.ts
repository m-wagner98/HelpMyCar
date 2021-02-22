import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';
import {HelpRequest} from '../../../shared/model/HelpRequest';
import {HelpRequestInformationService} from '../../services/help-request-information.service';
import {StatusService} from '../../../shared/services/status.service';


@Component({
  selector: 'app-confirm-service-vehicle',
  templateUrl: './confirm-service-vehicle.component.html',
  styleUrls: ['./confirm-service-vehicle.component.scss']
})
export class ConfirmServiceVehicleComponent implements OnInit {

  public id: number;
  public helpRequest: HelpRequest;

  @Output() serviceVehicleConfirmed: EventEmitter<any> = new EventEmitter<any>();

  constructor(
    private dialogRef: MatDialogRef<ConfirmServiceVehicleComponent>,
    private helpRequestInformationService: HelpRequestInformationService,
    private statusService: StatusService
  ) {
  }

  ngOnInit(): void {
    this.id = +window.location.href.split('/').pop();
    this.helpRequest = this.helpRequestInformationService.getRequest(this.id);
  }

  close(): void {
    this.dialogRef.close();
  }

  confirmServiceVehicle() {
    if (this.helpRequest.status === 'IN_PROGRESS') {
      this.statusService.updateStatus(this.id);
    }
    this.serviceVehicleConfirmed.emit();
    this.close();
  }

}
