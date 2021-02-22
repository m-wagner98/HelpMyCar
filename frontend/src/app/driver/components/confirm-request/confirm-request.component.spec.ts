import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ConfirmRequestComponent} from './confirm-request.component';
import {MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {LoginService} from '../../services/login.service';
import {of} from 'rxjs';
import {TestData} from '../../../shared/model/TestData/TestData';
import {ReverseGeocodePipe} from '../start-page/reverse-geocode.pipe';
import {VehicleInformationService} from '../../../shared/services/vehicle-information.service';

describe('ConfirmRequestComponent', () => {
  let component: ConfirmRequestComponent;
  let fixture: ComponentFixture<ConfirmRequestComponent>;
  // create mock MatDialog, necessary
  const mockDialogRef = {
    close: jasmine.createSpy('close')
  };
  let logInServiceMock: any;

  const vehicleInfoService = jasmine.createSpyObj('VehicleInformationService', ['getVehicleInformation']);
  vehicleInfoService.getVehicleInformation.and.returnValue(of(TestData.API_RESPONSE));

  logInServiceMock = jasmine.createSpyObj('LoginService', ['getDriverInfo']);
  logInServiceMock.getDriverInfo.and.returnValue(TestData.DRIVER);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ConfirmRequestComponent, ReverseGeocodePipe],
      imports: [MatDialogModule, HttpClientTestingModule, RouterTestingModule],
      providers: [{provide: MatDialogRef, useValue: mockDialogRef},
        {provide: LoginService, useValue: logInServiceMock}]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
