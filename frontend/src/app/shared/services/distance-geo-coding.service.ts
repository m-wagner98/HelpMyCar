import {Injectable} from '@angular/core';
import {HelpRequest} from '../model/HelpRequest';
import {DataPoint, InVehicleData} from '../model/ApiResponse';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable, of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DistanceGeoCodingService {

  helpRequest: HelpRequest;
  private cachedGeoCodeResponses = new Map();

  constructor(private http: HttpClient) {
  }

  calculateDistance(dataPointHelpRequest: DataPoint, dataPointServiceVehicle: DataPoint): number {
    let result;
    const RADIANS: number = 180 / 3.14159265;
    const METRES_IN_MILE = 1609.34;
    const x1 = dataPointHelpRequest.latitude;
    const y1 = dataPointHelpRequest.longitude;
    const x2 = dataPointServiceVehicle.latitude;
    const y2 = dataPointServiceVehicle.longitude;

    if (x1 === x2 && y1 === y2) {
      result = 0;

    } else {
      // Calculating Distance between Points
      const lt1 = x1 / RADIANS;
      const lg1 = y1 / RADIANS;
      const lt2 = x2 / RADIANS;
      const lg2 = y2 / RADIANS;

      // radius of earth in miles (3,958.8) * metres in a mile * position on surface of sphere...
      result = (3958.8 * METRES_IN_MILE) *
        Math.acos(Math.sin(lt1) * Math.sin(lt2) + Math.cos(lt1) * Math.cos(lt2) * Math.cos(lg2 - lg1)) / 1000;
      result = Math.round(result * 10) / 10;
    }
    return result;
  }

  /*
  * translates the coordinates (latitude and longitude) into an address
  * */
  geocode(inVehicleData: InVehicleData): Observable<string> {
    const key = inVehicleData.identifier.value;
    if (this.cachedGeoCodeResponses.has(key)) {
      return of(this.cachedGeoCodeResponses.get(key));
    } else {
      // retrieve data from google maps api
      const position = new BehaviorSubject<string>('DEFAULT');
      this.http.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${inVehicleData.response.geolocation.dataPoint.latitude},${inVehicleData.response.geolocation.dataPoint.longitude}&key=--Insert Key here--`
      ).subscribe((result: any) => {
        const address = result.results[0].formatted_address;
        position.next(address);
        this.cachedGeoCodeResponses.set(key, address);
        position.complete();
      });
      return position.asObservable();
    }
  }
}

