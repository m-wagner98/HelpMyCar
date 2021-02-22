import {Pipe, PipeTransform} from '@angular/core';
import {InVehicleData} from '../../../shared/model/ApiResponse';
import {HttpClient} from '@angular/common/http';
import {DistanceGeoCodingService} from '../../../shared/services/distance-geo-coding.service';
import {Observable, of} from 'rxjs';

/*
*  Translate given latitude and longitude values into
* an address
* */
@Pipe({
  name: 'reverseGeocode'
})
export class ReverseGeocodePipe implements PipeTransform {

  constructor(private http: HttpClient, private geoCodingService: DistanceGeoCodingService) {
  }

  transform(inVehicleData: InVehicleData): Observable<string> {
    if (!inVehicleData) {
      return of('GeoCoding failed');
    }
    return this.geoCodingService.geocode(inVehicleData);
  }
}

