import {TestBed} from '@angular/core/testing';

import {ChatService} from './chat.service';
import {TestData} from '../model/TestData/TestData';
import {LoginService} from '../../driver/services/login.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {HttpClient} from '@angular/common/http';

describe('ChatService', () => {
  let service: ChatService;
  let logInService: LoginService;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  // Mock LogInService
  const loginServiceSpy = jasmine.createSpyObj('LoginService', ['getDriverInfo']);
  const mockDriver = TestData.DRIVER;
  loginServiceSpy.getDriverInfo.and.returnValue(mockDriver);

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {provide: LoginService, useValue: loginServiceSpy}
      ],
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(ChatService);
    logInService = TestBed.inject(LoginService);
    // tslint:disable-next-line: deprecation
    httpClient = TestBed.get(HttpClient);
    // tslint:disable-next-line: deprecation
    httpTestingController = TestBed.get(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
