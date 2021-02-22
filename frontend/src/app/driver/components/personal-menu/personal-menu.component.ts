import {Component, OnInit} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {VehicleInformationService} from 'src/app/shared/services/vehicle-information.service';

@Component({
  selector: 'app-personal-menu',
  templateUrl: './personal-menu.component.html',
  styleUrls: ['./personal-menu.component.scss']
})
export class PersonalMenuComponent implements OnInit {

  constructor(
    // private socketService: SocketService,
    private titleService: Title,
    private vehicleInformationService: VehicleInformationService
  ) {
  }

  ngOnInit(): void {
  }

  terminate() {
    this.titleService.setTitle('Driver App');
    this.vehicleInformationService.setSelectedVin(undefined);
    // this.socketService.unsubscribeAll();
  }
}
