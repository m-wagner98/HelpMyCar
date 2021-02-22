import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Driver} from '../../shared/model/Driver';
import {HelpRequest} from '../../shared/model/HelpRequest';
import {GlobalConstants} from 'src/app/shared/GlobalConstants';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private url = GlobalConstants.apiURL;
  private driverInfo: Driver;

  constructor(
    private http: HttpClient
  ) {
  }

  public sendLoginData(username: string): Observable<Driver> {
    const responseObservable = this.http.get<Driver>(`${this.url}/login?user=${username}`);
    responseObservable.subscribe((response: Driver) => this.driverInfo = response);
    return responseObservable;
  }

  /**
   * Get any active help request for a given user.
   * @param username username of the user u want the request for
   */
  public getActiveRequest(username: string): Observable<HelpRequest> {
    return this.http.get<HelpRequest>(`${this.url}/getActiveRequest?user=${username}`);
  }

  public getDriverInfo(): Driver {
    if (this.driverInfo !== undefined) {
      return this.driverInfo;
    }
    return undefined;
  }
}
