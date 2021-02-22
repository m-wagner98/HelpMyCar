import {Component, Input, OnInit} from '@angular/core';
import {VehicleInformationService} from 'src/app/shared/services/vehicle-information.service';
import {TroubleCode} from 'src/app/shared/model/ApiResponse';
import {ProblemVisualizationService} from 'src/app/shared/services/problem-visualization.service';
import { DTCMockData } from '../../../shared/DTCMockData';

@Component({
  selector: 'app-driver-car-visualization',
  templateUrl: './driver-car-visualization.component.html',
  styleUrls: ['./driver-car-visualization.component.scss']
})
export class DriverCarVisualizationComponent implements OnInit {

  // mock data
  private troubleCodeMockData = DTCMockData.dataPoint.value[0].dtcs;
  public showPart = new Map<string, boolean>();

  @Input() vin: string;

  private troubleCodes: TroubleCode[];

  constructor(
    private vehicleInformationService: VehicleInformationService,
    private problemVisualizationService: ProblemVisualizationService) {
  }

  @Input('vin') set _vin(vin: string) {
    this.vin = vin;
    this.vehicleInformationService.getVehicleInformation().subscribe(vehicleInfo => {
      vehicleInfo.inVehicleData = vehicleInfo.inVehicleData.filter(vehicleData => vehicleData.identifier.value === this.vin);
      this.troubleCodes = vehicleInfo.inVehicleData[0].response.dtc.dataPoint.value[0].dtcs;
      if (this.vin !== "V1RTUALV1N0000004" && this.vin !== "V1RTUALV1N0000S05") {
        this.troubleCodes = this.troubleCodeMockData;
      }
      this.troubleCodes.forEach(troubleCode => {
        this.showPart.set(this.problemVisualizationService.getCarPartIdByDtc(troubleCode.dtcId), true);
      });
    });
  }

  ngOnInit(): void {
    // TODO: calculate the parts that should be shown by the dtc, contained in the vehicle info
    // need real dtcs for that
  }

}
