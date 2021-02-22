import {TestBed} from '@angular/core/testing';

import {HelpRequestInformationService} from './help-request-information.service';

describe('HelpRequestInformationService', () => {
  let service: HelpRequestInformationService;
  /*const helpRequest: HelpRequest[] = [
    {
      driver: TestData.DRIVER,
      apiResponse: TestData.API_RESPONSE,
      status: 'OPEN',
      id: null
    }
  ];*/
  const helpRequestServiceSpy =
    jasmine.createSpyObj('HelpRequestInformationService', ['getRequest']);

  // helpRequestServiceSpy.getRequest.and.returnValue(helpRequest);

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{provide: HelpRequestInformationService, useValue: helpRequestServiceSpy}]
    });
    service = TestBed.inject(HelpRequestInformationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
