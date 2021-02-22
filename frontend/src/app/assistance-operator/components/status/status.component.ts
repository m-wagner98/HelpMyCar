import {Component, Input, OnInit} from '@angular/core';
import {HelpRequest} from 'src/app/shared/model/HelpRequest';
import {HelpRequestInformationService} from '../../services/help-request-information.service';
import {StatusService} from 'src/app/shared/services/status.service';


@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.scss']
})
export class StatusComponent implements OnInit {

  public helpRequest: HelpRequest = {driver: null, apiResponse: null, status: 'OPEN', id: null, createdAt: null};
  public status: string;
  public id: number;

  public isHighlighted: boolean[];
  public isAlreadySelected: boolean[];

  @Input('id') set _id(value: number) {
    this.id = value;
    this.helpRequest = this.helpRequestInformationService.getRequest(this.id);
    this.updateDashboard(this.helpRequest.status);
  }

  constructor(
    private helpRequestInformationService: HelpRequestInformationService,
    private statusService: StatusService
  ) {
  }

  ngOnInit(): void {
    this.statusService.getStatus().subscribe((status) => this.updateDashboard(status));
    this.updateDashboard(this.helpRequest.status);
  }

  updateDashboard(status: string) {
    this.status = status;
    const highlightIndex = this.statusService.getIndex(this.status);
    this.isHighlighted = new Array(4).fill(false);
    this.isHighlighted[highlightIndex] = true;

    this.isAlreadySelected = new Array(highlightIndex + 1).fill(true);
  }
}
