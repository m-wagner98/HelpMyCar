import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {DriverCarVisualizationComponent} from './driver-car-visualization.component';
import {VehicleInformationService} from '../../../shared/services/vehicle-information.service';
import {of} from 'rxjs';
import {TestData} from '../../../shared/model/TestData/TestData';

describe('DriverCarVisualizationComponent', () => {
  let component: DriverCarVisualizationComponent;
  let fixture: ComponentFixture<DriverCarVisualizationComponent>;

  // mock VehicleInformationService
  const vehicleInfoSpy = jasmine.createSpyObj('VehicleInformationService', ['getVehicleInformation']);
  vehicleInfoSpy.getVehicleInformation.and.returnValue(of(TestData.API_RESPONSE));

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DriverCarVisualizationComponent],
      providers: [{provide: VehicleInformationService, useValue: vehicleInfoSpy}]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DriverCarVisualizationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
