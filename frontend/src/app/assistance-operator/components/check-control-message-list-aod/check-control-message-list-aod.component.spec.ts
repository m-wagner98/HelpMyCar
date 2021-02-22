import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {CheckControlMessageListAodComponent} from './check-control-message-list-aod.component';
import {HelpRequestInformationService} from '../../services/help-request-information.service';
import {TestData} from '../../../shared/model/TestData/TestData';
import {Component, ViewChild} from '@angular/core';

describe('CheckControlMessageListAodComponent', () => {
  // Test Host Component
  let testHostComponent: TestHostComponent;
  let testHostFixture: ComponentFixture<TestHostComponent>;

  const helpService = jasmine.createSpyObj('HelpRequestInformationService', ['getRequest']);
  helpService.getRequest.and.returnValue(TestData.helpRequest[0]);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CheckControlMessageListAodComponent, TestHostComponent],
      providers: [{provide: HelpRequestInformationService, useValue: helpService}]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    testHostFixture = TestBed.createComponent(TestHostComponent);
    testHostComponent = testHostFixture.componentInstance;
    testHostFixture.detectChanges();
    testHostComponent.checkControlMessageListAodComponent._id = 0;
  });

  it('should return right position or throw error', () => {
    expect(testHostComponent.checkControlMessageListAodComponent.getDataPositionFromVehicleInfoList('V1RTUALV1N0000001'))
      .toEqual(0);
    expect(() => {
      testHostComponent.checkControlMessageListAodComponent.getDataPositionFromVehicleInfoList('1234');
    })
      .toThrow();
  });

  @Component({
    // tslint:disable-next-line:component-selector
    selector: `host-component`,
    template: `<app-check-control-message-list-aod [id]="0"></app-check-control-message-list-aod>`
  })
  class TestHostComponent {
    @ViewChild(CheckControlMessageListAodComponent)
    public checkControlMessageListAodComponent: CheckControlMessageListAodComponent;
  }

});
