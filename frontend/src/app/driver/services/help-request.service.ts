import {Injectable} from '@angular/core';
import {SocketService} from 'src/app/shared/services/socket.service';
import {LoginService} from './login.service';
import {VehicleInformationService} from 'src/app/shared/services/vehicle-information.service';
import {GlobalConstants} from 'src/app/shared/GlobalConstants';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HelpRequestService {

  private url = GlobalConstants.apiURL;

  constructor(
    private loginService: LoginService,
    private socketService: SocketService,
    private vehicleInformationService: VehicleInformationService,
    private http: HttpClient
  ) {
  }

  sendHelpRequest() {
    // const destination = '/app/request';
    const driverInfo = this.loginService.getDriverInfo();
    const vin = this.vehicleInformationService.getSelectedVin();
    // const driver: Driver = { // make a deep copy
    //   vinList: [this.vehicleInformationService.getSelectedVin()],
    //   user: driverInfo.user,
    //   customerNumber: driverInfo.customerNumber,
    //   firstName: driverInfo.firstName,
    //   lastName: driverInfo.lastName,
    //   entryDate: driverInfo.entryDate,
    //   residence: driverInfo.residence,
    //   email: driverInfo.email,
    //   phoneNumber: driverInfo.phoneNumber
    // };
    // this.socketService.sendMessage(destination, {}, JSON.stringify(driver));
    this.http.get(this.url + `/addRequest?user=${driverInfo.user}&vin=${vin}`).subscribe();
  }
}
