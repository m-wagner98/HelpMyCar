import {Component, OnInit} from '@angular/core';
import {LoginService} from '../../services/login.service';
import {Router} from '@angular/router';
import {Driver} from 'src/app/shared/model/Driver';
import {StatusService} from '../../../shared/services/status.service';
import {HelpRequest} from '../../../shared/model/HelpRequest';
import {ChatService} from 'src/app/shared/services/chat.service';
import {Title} from '@angular/platform-browser';
import {VehicleInformationService} from 'src/app/shared/services/vehicle-information.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  isUsernameValid = true;

  constructor(
    private loginService: LoginService,
    private router: Router,
    private statusService: StatusService,
    private chatService: ChatService,
    private titleService: Title,
    private vehicleInformationService: VehicleInformationService
  ) {
  }

  ngOnInit(): void {
  }

  login(username: string): void {
    this.loginService.sendLoginData(username).subscribe(response =>
      this.checkResponse(response), () => this.checkResponse(null)
    );
  }

  checkResponse(response: Driver) {
    if (response === null) {
      this.isUsernameValid = false;
    } else {
      this.isUsernameValid = true;
      this.chatService.listenForChanges();
      // this.statusService.connectToSocket();
      this.titleService.setTitle(response.firstName + ' ' + response.lastName);
      this.loginService.getActiveRequest(response.user).subscribe((req) => {
        const activeRequest: HelpRequest = req;
        if (activeRequest !== null) {
          this.vehicleInformationService.setSelectedVin(activeRequest.apiResponse.inVehicleData[0].identifier.value);
          this.statusService.setStatus(activeRequest.status);
          this.router.navigate(['driver', 'status']);
        } else {
          this.statusService.setStatus('OPEN');
          this.router.navigate(['driver', 'start-page']);
        }
      });
    }
  }
}

