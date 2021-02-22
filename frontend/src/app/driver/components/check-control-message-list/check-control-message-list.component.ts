import { Component, Input, OnInit } from '@angular/core';
import { ApiResponse, Response, Value } from 'src/app/shared/model/ApiResponse';

@Component({
  selector: 'app-check-control-message-list',
  templateUrl: './check-control-message-list.component.html',
  styleUrls: ['./check-control-message-list.component.scss']
})
export class CheckControlMessageListComponent implements OnInit {
  public checkControlMessages: Value[] = [];
  public response: Response;
  @Input() selectedVIN: string;
  @Input() vehicleInfo: ApiResponse;

  constructor() {
  }

  ngOnInit(): void {
    this.checkControlMessages = this.vehicleInfo.inVehicleData[this.getDataPositionFromVehicleInfoList(this.selectedVIN)].response
      .checkControlMessages.dataPoint.value;
  }

  getDataPositionFromVehicleInfoList(vin: string): number {
    for (let i = 0; i < this.vehicleInfo.inVehicleData.length; i++) {
      if (vin === this.vehicleInfo.inVehicleData[i].identifier.value) {
        return i;
      }
    }
    throw new Error('No matching vin');
  }

}
