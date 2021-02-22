import {Component, Input, OnInit} from '@angular/core';
import {ApiResponse, Response, Value} from 'src/app/shared/model/ApiResponse';
import {HelpRequest} from 'src/app/shared/model/HelpRequest';
import {HelpRequestInformationService} from '../../services/help-request-information.service';
import {iconList} from '../../model/checkControlMessageIcons';


@Component({
  selector: 'app-check-control-message-list-aod',
  templateUrl: './check-control-message-list-aod.component.html',
  styleUrls: ['./check-control-message-list-aod.component.scss']
})
export class CheckControlMessageListAodComponent implements OnInit {
  public checkControlMessages: Value[] = [];
  public response: Response;
  private id: number;
  public helpRequest: HelpRequest;
  public vehicleInfo: ApiResponse;
  public icons: string[];
  public assets = 'assets/check_control_message_icons';
  public activeMessages: ControlMessageElement[];
  public iconMap = new Map<number, string>()
    .set(400, '/battery.svg') // Value: 400; Status: (unknown)
    .set(123, '/brakePad.svg') // Value: 123; Status: (critical)
    .set(200, '/brakePad.svg') // Value: 200; Status: (critical)
    .set(600, '/brakePad.svg') // Value: 600; Status: (ok)
    .set(42, '/airbag.svg') // Value: 42; Status: (critical)
    .set(10, '/refuel.svg') // Value: 10; Status: (critical)
    .set(500, '/motor.svg') // Value: 500; Status: (critical)
    .set(250, '/overheating.svg'); // Value: 250; Status: (critical)

  @Input('id') set _id(value: number) {
    this.id = value;
    this.helpRequest = this.helpRequestInformationService.getRequest(this.id);
    this.vehicleInfo = this.helpRequest.apiResponse;
    this.checkControlMessages = this.vehicleInfo.inVehicleData[0].response.checkControlMessages.dataPoint.value;
    this.icons = [...iconList];
    this.activeMessages = [];
    this.updateIcons();
  }


  constructor(private helpRequestInformationService: HelpRequestInformationService) {
  }

  ngOnInit(): void {
  }

  updateIcons(): void {
    this.checkControlMessages.forEach((checkControlMessage) => {
      const oldPath = this.assets + this.iconMap.get(checkControlMessage.value);
      this.icons.splice(this.icons.indexOf(oldPath), 1);
      const newPath = oldPath.split('.svg')[0] + 'On.svg';
      this.activeMessages.push({
        message: checkControlMessage.message,
        icon: newPath
      });
    });
  }
}

interface ControlMessageElement {
  message: string;
  icon: string;
}
