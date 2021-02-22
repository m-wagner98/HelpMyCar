import {TestBed} from '@angular/core/testing';

import {VehicleInformationService} from './vehicle-information.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('VehicleInformationService', () => {
  let service: VehicleInformationService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(VehicleInformationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
