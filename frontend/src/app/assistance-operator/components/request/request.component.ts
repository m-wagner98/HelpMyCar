import {Component, Input, OnInit, Pipe, PipeTransform} from '@angular/core';
import {HelpRequest} from 'src/app/shared/model/HelpRequest';
import {HelpRequestInformationService} from '../../services/help-request-information.service';

@Pipe({name: 'statusColor'})
export class StatusColor implements PipeTransform {
  transform(status: string): string {
    switch (status) {
      case 'OPEN':
        return '#398DE0';
      case 'IN_PROGRESS':
        return '#00DED5';
      case 'SERVICE_VEHICLE_ON_THE_WAY':
        return '#38F891';
      case 'CLOSED':
        return '#9F9F9F';
      default:
        throw new Error('Wrong status!');
    }
  }
}

@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.scss']
})
export class RequestComponent implements OnInit {
  @Input() helpRequest: HelpRequest;

  constructor(private helpRequestInformationService: HelpRequestInformationService) {
  }

  ngOnInit(): void {
  }

  getIcon(): string {
    return this.helpRequestInformationService.getIcon(this.helpRequest.id);
  }
}
