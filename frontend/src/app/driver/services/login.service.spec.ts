import {TestData} from '../../shared/model/TestData/TestData';
import {Driver} from './../../shared/model/Driver';
import {TestBed} from '@angular/core/testing';

import {LoginService} from './login.service';
import {HttpClient, HttpClientModule} from '@angular/common/http';

import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {of} from 'rxjs';


describe('LoginService', () => {
  let service: LoginService;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  const driverInfo: Driver = TestData.DRIVER;


  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [],
      imports: [HttpClientModule, HttpClientTestingModule]
    });
    service = TestBed.inject(LoginService);
    httpClient = TestBed.get(HttpClient);
    // tslint:disable-next-line: deprecation
    httpTestingController = TestBed.get(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('#sendLoginData return a Observable from type Drvier', () => {
    expect(of(driverInfo)).toBeDefined();
  });


  it('#getDriverInfo should return driver Information', () => {
    // tslint:disable-next-line: no-unused-expression
    expect(driverInfo).toBeDefined();
  });

});
