import {Injectable} from '@angular/core';
import {HelpRequest} from 'src/app/shared/model/HelpRequest';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, interval, Observable} from 'rxjs';
import {SocketService} from 'src/app/shared/services/socket.service';
import {Dtc} from 'src/app/shared/model/ApiResponse';
import {GlobalConstants} from 'src/app/shared/GlobalConstants';
import {DTCMockData} from 'src/app/shared/DTCMockData';

@Injectable({
  providedIn: 'root'
})
export class HelpRequestInformationService {
  private url = GlobalConstants.apiURL;
  public helpRequests: HelpRequest[] = [];
  private helpRequestsBehaviorSubject = new BehaviorSubject<HelpRequest[]>(this.helpRequests);

  public dtc: Dtc = DTCMockData; // dtc mock data
  constructor(
    private http: HttpClient,
    private socketService: SocketService) {
  }

  /**
   * Adds a request to the list and converts it's creation time. Also subscribes the request to an interval that
   * updates the time.
   * @param request that is added
   */
  addRequest(request: HelpRequest) {
    // load mock data if there are no dtcs yet
    if (!request.apiResponse.inVehicleData[0].response.dtc ||
      request.apiResponse.inVehicleData[0].response.dtc?.dataPoint.value[0].dtcs.length === 0) {
      request.apiResponse.inVehicleData[0].response.dtc = this.dtc;
    }
    const timeUpdate = interval(60000);
    console.log(new Date(Date.now()) + ' ' + request.createdAt);
    request.createdAt = (Math.ceil((Date.now() - new Date(request.createdAt).getTime()) / 60000)).toString();
    timeUpdate.subscribe(() => {
      request.createdAt = (parseInt(request.createdAt, 10) + 1).toString();
    });
    this.helpRequests.unshift(request);
    this.helpRequestsBehaviorSubject.next(this.helpRequests);
  }

  /**
   * Listen new Help requests.
   */
  listenForChanges() {
    // const destination = '/topic/requests';
    // this.socketService.subscribeToDestination(destination, (message) => {
    //   const helpRequest: HelpRequest = JSON.parse(message.body);
    //   this.addRequest(helpRequest);
    // });

    setInterval(() => {
      this.http.get<HelpRequest[]>(this.url + '/getRequestList')
        .subscribe(requestList => {
          // check if there are new requests
          if (requestList.length > this.helpRequests.length) {
            requestList.forEach((request) => {
              let idAlreadyExists = false;
              this.helpRequests.forEach((localRequest) => {
                if (localRequest.id === request.id) {
                  idAlreadyExists = true;
                }
              });
              if (!idAlreadyExists) {
                this.addRequest(request);
              }
            });
          }
        });
    }, 1000);
  }

  /**
   * Returns an observable that notifies you with the help request list when an element is added.
   */
  getHelpRequestsObservable(): Observable<HelpRequest[]> {
    return this.helpRequestsBehaviorSubject.asObservable();
  }

  getRequest(id: number): HelpRequest {
    return this.helpRequests.find(request => request.id === id);
  }

  updateStatus(id: number, newStatus: string) {
    this.getRequest(id).status = newStatus;
  }

  findAUsersHelpRequests(user: string): number[] {
    if (user === 'AssistanceOperator') {
      return;
    }
    const ids: number[] = [];
    this.helpRequests.forEach((request) => {
      if (request.driver.user === user) {
        ids.push(request.id);
      }
    });
    return ids;
  }

  /**
   * Gets the list of all HelpRequests from the backend.
   */
  loadHelpRequestListFromBackend(): void {
    this.http.get<HelpRequest[]>(this.url + '/getRequestList')
      .subscribe(requestList => requestList.forEach(request => this.addRequest(request)));
  }

  resetApplication() {
    this.helpRequests = [];
    const destination = GlobalConstants.apiURL + '/resetBackend';
    this.http.get(destination, {responseType: 'text'}).subscribe((msg) => {
      console.log(msg);
      sessionStorage.clear();
      location.reload();
    }, err => console.log(err));
  }

  getIcon(id: number): string {
    const carModel = this.getRequest(id).apiResponse.inVehicleData[0].response.basicVehicleData.dataPoint.value[0].modelName;
    switch (carModel) {
      case 'B02':
        return 'assets/car_icons/car_b02.svg';
      case 'B04-E':
        return 'assets/car_icons/car_b04e.svg';
      case 'VOEM-Electric05':
        return 'assets/car_icons/car_voem-electric05.svg';
      case 'VOEM-Electric06':
        return 'assets/car_icons/car_voem-electric06.svg';
      case 'VOEM-Q8':
        return 'assets/car_icons/car_voem-q8.svg';
      case 'VOEM-LongDrive':
        return 'assets/car_icons/car_voem-longdrive.svg';
      default:
        return 'assets/car_icons/car_b01.svg';
    }
  }
}
