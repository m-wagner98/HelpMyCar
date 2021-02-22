import {Component, Input, OnInit} from '@angular/core';
import {HelpRequestInformationService} from '../../services/help-request-information.service';
import {HelpRequest} from 'src/app/shared/model/HelpRequest';
import {Value} from 'src/app/shared/model/ApiResponse';

@Component({
  selector: 'app-driver-information',
  templateUrl: './driver-information.component.html',
  styleUrls: ['./driver-information.component.scss']
})
export class DriverInformationComponent implements OnInit {
  @Input('id') set _id(value: number) {
    this.id = value;
    this.helpRequest = this.helpRequestInformationService.getRequest(this.id);
    this.basicVehicleData = this.helpRequest.apiResponse.inVehicleData[0].response.basicVehicleData.dataPoint.value[0];
  }

  public isPanelOpen = false;
  public arrowClass = '';
  private id: number;
  public helpRequest: HelpRequest;
  public basicVehicleData: Value;

  constructor(
    private helpRequestInformationService: HelpRequestInformationService
  ) {
  }

  ngOnInit(): void {
  }

  togglePanel() {
    if (this.isPanelOpen) {
      this.arrowClass = '';
    } else {
      this.arrowClass = 'rotate-180';
    }
    this.isPanelOpen = !this.isPanelOpen;
  }

  getIcon(): string {
    return this.helpRequestInformationService.getIcon(this.id);
  }
}
