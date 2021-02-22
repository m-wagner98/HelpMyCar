import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ConfirmServiceVehicleComponent} from './confirm-service-vehicle.component';
import {MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import {HelpRequestInformationService} from '../../services/help-request-information.service';
import {TestData} from '../../../shared/model/TestData/TestData';
import {StatusService} from '../../../shared/services/status.service';

describe('ConfirmServiceVehicleComponent', () => {
  let component: ConfirmServiceVehicleComponent;
  let fixture: ComponentFixture<ConfirmServiceVehicleComponent>;
  // Mock MatDialogRef
  const mockDialogRef = {
    close: jasmine.createSpy('close')
  };
  // Mock HelpRequestInformationService
  const helpRequestInfoServiceSpy =
    jasmine.createSpyObj('HelpRequestInformationService', ['getRequest']);
  const mockRequest = TestData.helpRequest;
  helpRequestInfoServiceSpy.getRequest.and.returnValue(mockRequest);
  // Mock StatusService
  const statusServiceSpy = jasmine.createSpyObj('StatusService', ['updateStatus']);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ConfirmServiceVehicleComponent],
      imports: [MatDialogModule],
      providers: [
        {provide: MatDialogRef, useValue: mockDialogRef},
        {provide: HelpRequestInformationService, useValue: helpRequestInfoServiceSpy},
        {provide: StatusService, useValue: statusServiceSpy}
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmServiceVehicleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
