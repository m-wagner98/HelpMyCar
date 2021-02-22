import {Component, Input, OnInit} from '@angular/core';
import {HelpRequest} from 'src/app/shared/model/HelpRequest';
import {HelpRequestInformationService} from '../../services/help-request-information.service';
import {TroubleCode} from 'src/app/shared/model/ApiResponse';

@Component({
  selector: 'app-diagnostic-trouble-code-list',
  templateUrl: './diagnostic-trouble-code-list.component.html',
  styleUrls: ['./diagnostic-trouble-code-list.component.scss']
})
export class DiagnosticTroubleCodeListComponent implements OnInit {
  private id: number;
  public helpRequest: HelpRequest;
  public troubleCodes: TroubleCode[];
  public isPanelOpen = false;
  public arrowClass = '';

  @Input('id') set _id(value: number) {
    this.id = value;
    this.helpRequest = this.helpRequestInformationService.getRequest(this.id);
    this.troubleCodes = this.helpRequest.apiResponse.inVehicleData[0].response.dtc.dataPoint.value[0].dtcs;
  }

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
}
