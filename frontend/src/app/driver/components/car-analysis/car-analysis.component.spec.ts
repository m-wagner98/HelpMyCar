import {TestData} from '../../../shared/model/TestData/TestData';
import {VehicleInformationService} from '../../../shared/services/vehicle-information.service';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {CarAnalysisComponent} from './car-analysis.component';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {of} from 'rxjs';
import {ReverseGeocodePipe} from '../start-page/reverse-geocode.pipe';
import {LoginService} from '../../services/login.service';

describe('CarAnalysisComponent', () => {
  let component: CarAnalysisComponent;
  let fixture: ComponentFixture<CarAnalysisComponent>;

  const vehicleInfo = TestData.API_RESPONSE;
  const vehicleInfoServiceSpy =
    jasmine.createSpyObj('VehicleInformationService', ['getVehicleInformation', 'getSelectedVin']);
  vehicleInfoServiceSpy.getVehicleInformation.and.returnValue(of(vehicleInfo));
  vehicleInfoServiceSpy.getSelectedVin.and.returnValue(TestData.DRIVER.vinList[0]);

  const driverMock = TestData.DRIVER;
  const loginServiceSpy = jasmine.createSpyObj('LoginService', ['getDriverInfo']);
  loginServiceSpy.getDriverInfo.and.returnValue(driverMock);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CarAnalysisComponent, ReverseGeocodePipe],
      imports: [HttpClientTestingModule],
      providers: [{provide: VehicleInformationService, useValue: vehicleInfoServiceSpy},
        {provide: LoginService, useValue: loginServiceSpy}
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarAnalysisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should throw error or return right position', () => {
    expect(() => {
      component.getDataPositionFromVehicleInfoList('1234');
    }).toThrow();
    expect(component.getDataPositionFromVehicleInfoList('V1RTUALV1N0000001')).toBe(0);
  });

  it('should retrieve vehicle and driver information', () => {
    component.getVehicleAndDriverInfo();
    expect(component.vehicleInfo).toEqual(TestData.API_RESPONSE);
    expect(component.driver).toEqual(TestData.DRIVER);
  });
});
