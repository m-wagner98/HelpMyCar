import {Injectable} from '@angular/core';
import {SocketService} from './socket.service';
import {HelpRequestInformationService} from 'src/app/assistance-operator/services/help-request-information.service';
import {HelpRequest} from '../model/HelpRequest';
import {LoginService} from 'src/app/driver/services/login.service';
import {BehaviorSubject, Observable} from 'rxjs';
import {GlobalConstants} from '../GlobalConstants';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class StatusService {

  private localRequestList: HelpRequest[];
  private status = new BehaviorSubject<string>('OPEN');
  private url = GlobalConstants.apiURL;

  constructor(
    private socketService: SocketService,
    private helpRequestInformationService: HelpRequestInformationService,
    private loginService: LoginService,
    private http: HttpClient
  ) {
  }

  /**
   * Update the status of a help request.
   * @param id help request id
   */
  updateStatus(id: number): void {
    // const destination = '/app/status';
    // const helpRequest = this.helpRequestInformationService.getRequest(id);
    // console.log(helpRequest.status);
    // this.helpRequestInformationService.updateStatus(id, this.next(helpRequest.status));
    // this.socketService.sendMessage(destination, {}, JSON.stringify(helpRequest));

    this.http.get(this.url + `/updateStatus?requestId=${id}`).subscribe();
  }

  /**
   * Listen for status changes.
   */
  listenForChanges() {
    // const destination = '/topic/status';
    // this.socketService.subscribeToDestination(destination, (message) => {
    //   const helpRequest: HelpRequest = JSON.parse(message.body);
    //   // check if update is meant for this user or for assistance operator
    //   if (this.loginService.getDriverInfo() !== undefined &&
    //     helpRequest.driver.customerNumber !== this.loginService.getDriverInfo().customerNumber) {
    //     return;
    //   }
    //   this.status.next(helpRequest.status);
    // });

    // init status updates
    this.http.get<HelpRequest[]>(this.url + '/getRequestList').subscribe(requestList => this.localRequestList = requestList);

    setInterval(() => {
      this.http.get<HelpRequest[]>(this.url + '/getRequestList')
        .subscribe(requestList => {
          // check for changes in any request
          for (let i = 0; i < this.localRequestList.length; i++) {
            // check for a status change and check if a user is signed in and if he is the one corresponding to the request
            if (this.localRequestList[i].status !== requestList[i].status &&
              !(this.loginService.getDriverInfo() !== undefined &&
                requestList[i].driver.customerNumber !== this.loginService.getDriverInfo().customerNumber)) {
              // update the status of the current requests for the assistance operator
              if (this.loginService.getDriverInfo() === undefined) {
                this.helpRequestInformationService.updateStatus(i, requestList[i].status);
              }
              this.status.next(requestList[i].status);
            }
          }
          // update the local list in case a new request came
          this.localRequestList = requestList;
        });
    }, 1000);
  }

  public getStatus(): Observable<string> {
    return this.status.asObservable();
  }

  public setStatus(value: string): void {
    this.status.next(value);
  }

  public next(currentStatus: string): string {
    switch (currentStatus) {
      case 'OPEN':
        return 'IN_PROGRESS';
      case 'IN_PROGRESS':
        return 'SERVICE_VEHICLE_ON_THE_WAY';
      case 'SERVICE_VEHICLE_ON_THE_WAY':
        return 'CLOSED';
      case 'CLOSED':
        return 'OPEN';
      default:
        throw new Error('Wrong status!');
    }
  }

  public getTranslation(status: string): string {
    switch (status) {
      case 'OPEN':
        return 'Request received\nWe will process your request very soon.';
      case 'IN_PROGRESS':
        return 'Request accepted\nWe are analyzing your problem.';
      case 'SERVICE_VEHICLE_ON_THE_WAY':
        return 'A towing vehicle is on the way.\nIt will arrive in an estimated time of 7 minutes.';
      case 'CLOSED':
        return 'Towing vehicle arrived';
      default:
        throw new Error('Wrong status!');
    }
  }

  public getIcon(status: string): string {
    switch (status) {
      case 'OPEN':
        return 'open';
      case 'IN_PROGRESS':
        return 'in_progress';
      case 'SERVICE_VEHICLE_ON_THE_WAY':
        return 'service_vehicle_on_the_way';
      case 'CLOSED':
        return 'closed';
      default:
        throw new Error('Wrong status!');
    }
  }

  public getIndex(status: string): number {
    switch (status) {
      case 'OPEN':
        return 0;
      case 'IN_PROGRESS':
        return 1;
      case 'SERVICE_VEHICLE_ON_THE_WAY':
        return 2;
      case 'CLOSED':
        return 3;
      default:
        throw new Error('Wrong status!');
    }
  }
}
