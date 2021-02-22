import {TestBed} from '@angular/core/testing';

import {HelpRequestService} from './help-request.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('HelpRequestService', () => {
  let service: HelpRequestService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(HelpRequestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
