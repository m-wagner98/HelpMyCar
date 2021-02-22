import {TestBed} from '@angular/core/testing';

import {DistanceGeoCodingService} from './distance-geo-coding.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('DistanceService', () => {
  let service: DistanceGeoCodingService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(DistanceGeoCodingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
