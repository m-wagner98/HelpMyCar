import {TestBed} from '@angular/core/testing';

import {ControlMessageService} from './controlMessage.service';

describe('ControlMessageService', () => {
  let service: ControlMessageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ControlMessageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
