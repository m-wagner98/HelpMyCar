import {Component, Input, OnInit} from '@angular/core';
import {HelpRequest} from '../../../shared/model/HelpRequest';
import {HelpRequestInformationService} from '../../services/help-request-information.service';
import {ProblemVisualizationService} from 'src/app/shared/services/problem-visualization.service';
import {NgbSlideEvent} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-car-visualization',
  templateUrl: './car-visualization.component.html',
  styleUrls: ['./car-visualization.component.scss']
})
export class CarVisualizationComponent implements OnInit {

  private id: number;
  public helpRequest: HelpRequest;
  public showPart = new Map<string, boolean>();

  constructor(
    private helpRequestService: HelpRequestInformationService,
    public problemVisualization: ProblemVisualizationService
  ) {
  }

  @Input('id') set _id(value: number) {
    this.id = value;
    this.helpRequest = this.helpRequestService.getRequest(this.id);
    this.helpRequest.apiResponse.inVehicleData[0].response.dtc.dataPoint.value[0].dtcs.forEach(dtc => {
      this.showPart.set(this.problemVisualization.getCarPartIdByDtc(dtc.dtcId), true);
    });
  }

  ngOnInit(): void {
  }

  mouseenterDamage(event: MouseEvent) {
    this.problemVisualization.highlightDamage((event.target as HTMLElement).id.split('-')[0], true);
  }

  mouseleaveDamage(event: MouseEvent) {
    this.problemVisualization.stopHighlightingDamage((event.target as HTMLElement).id.split('-')[0]);
  }

  onSlideChange(slideEvent: NgbSlideEvent) {
    this.problemVisualization.onSlideChange(+slideEvent.current.slice(-1));
  }
}
