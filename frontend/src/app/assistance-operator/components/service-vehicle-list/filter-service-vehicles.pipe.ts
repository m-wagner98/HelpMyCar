import {Pipe, PipeTransform} from '@angular/core';
import {ServiceVehicle} from '../../model/service-vehicle';

@Pipe({
  name: 'filterServiceVehicles'
})
export class FilterServiceVehiclesPipe implements PipeTransform {
  transform(serviceVehicles: ServiceVehicle[], criteria: string): ServiceVehicle[] {
    if (!serviceVehicles) {
      return [];
    }
    if (criteria) {
      serviceVehicles = serviceVehicles.filter(t => t.type === criteria);
    }
    return serviceVehicles.filter(t => t.available);
  }

}

