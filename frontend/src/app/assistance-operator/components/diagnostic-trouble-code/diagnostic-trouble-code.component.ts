import { Component, Input, OnInit } from '@angular/core';
import { TroubleCode } from 'src/app/shared/model/ApiResponse';
import { ProblemVisualizationService } from 'src/app/shared/services/problem-visualization.service';

@Component({
  selector: 'app-diagnostic-trouble-code',
  templateUrl: './diagnostic-trouble-code.component.html',
  styleUrls: ['./diagnostic-trouble-code.component.scss']
})
export class DiagnosticTroubleCodeComponent implements OnInit {

  public troubleCode: TroubleCode;

  @Input('troubleCode') set _troubleCode(value: TroubleCode) {
    this.troubleCode = value;
    this.carPartId = this.getCarPartId(this.troubleCode.dtcId);
  }

  private carPartId: string;
  public showHoverEffect = false;

  constructor(public problemVisualization: ProblemVisualizationService) {
  }

  ngOnInit(): void {
    this.problemVisualization.subscribeToVisualizationChanges().subscribe(carPartId => this.handleHighlightingChange(carPartId));
  }

  convertTimestamp(timestamp: string): string {
    const date = new Date(timestamp);
    const options = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      timeZoneName: 'short'
    };
    return date.toLocaleDateString('en-GB', options);
  }

  mouseenterDamage() {
    this.problemVisualization.highlightDamage(this.carPartId, false);
    this.showHoverEffect = true;
  }

  mouseleaveDamage() {
    this.problemVisualization.stopHighlightingDamage(this.carPartId);
    this.showHoverEffect = false;
  }

  getTranslation(dtc: string): string {
    return this.problemVisualization.getTranslationByDtc(dtc);
  }

  getCarPartId(dtc: string): string {
    return this.problemVisualization.getCarPartIdByDtc(dtc);
  }

  handleHighlightingChange(carPartId: string) {
    this.showHoverEffect = carPartId === this.carPartId;
  }
}
