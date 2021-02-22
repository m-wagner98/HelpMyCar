import {TestData} from '../../../shared/model/TestData/TestData';
import {VehicleInformationService} from 'src/app/shared/services/vehicle-information.service';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {StartPageComponent} from './start-page.component';
import {RouterTestingModule} from '@angular/router/testing';
import {MatDialogModule} from '@angular/material/dialog';

import {HttpClient, HttpClientModule} from '@angular/common/http';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';


describe('StartPageComponent', () => {
  let component: StartPageComponent;
  let fixture: ComponentFixture<StartPageComponent>;

  let httpClient: HttpClientModule;
  let httpTestingController: HttpTestingController;

  const vehicleInfoServiceSpy =
    jasmine.createSpyObj('VehicleInformationService', ['getVehicleInformation']);

  vehicleInfoServiceSpy.getVehicleInformation.and.returnValue(TestData.DRIVER.vinList);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [StartPageComponent],
      imports: [RouterTestingModule, MatDialogModule, HttpClientModule, HttpClientTestingModule]
    })
      .compileComponents();
    // tslint:disable-next-line: deprecation
    httpClient = TestBed.get(HttpClient);
    // tslint:disable-next-line: deprecation
    httpTestingController = TestBed.get(HttpTestingController);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StartPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
