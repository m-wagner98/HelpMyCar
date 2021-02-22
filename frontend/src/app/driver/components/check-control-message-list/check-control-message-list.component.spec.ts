import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {CheckControlMessageListComponent} from './check-control-message-list.component';
import {Component, ViewChild} from '@angular/core';
import {TestData} from '../../../shared/model/TestData/TestData';

describe('CheckControlMessageListComponent', () => {
  // TestHostComponent
  let testHostComponent: TestHostComponent;
  let hostFixture: ComponentFixture<TestHostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CheckControlMessageListComponent, TestHostComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    hostFixture = TestBed.createComponent(TestHostComponent);
    testHostComponent = hostFixture.componentInstance;
    hostFixture.detectChanges();
  });

  it('should create', () => {
    expect(testHostComponent).toBeTruthy();
  });

  it('should return right position or return error', () => {
    expect(testHostComponent.checkMessageList.getDataPositionFromVehicleInfoList('V1RTUALV1N0000001'))
      .toEqual(0);
    expect(() => {
      testHostComponent.checkMessageList.getDataPositionFromVehicleInfoList('123');
    })
      .toThrow();
  });

  @Component({
    // tslint:disable-next-line:component-selector
    selector: `host-component`,
    template: `<app-check-control-message-list [selectedVIN]="selectedVIN" [vehicleInfo]="vehicleInfo"></app-check-control-message-list>`
  })
  class TestHostComponent {
    @ViewChild(CheckControlMessageListComponent)
    checkMessageList: CheckControlMessageListComponent;
    vehicleInfo = TestData.API_RESPONSE;
    selectedVIN = 'V1RTUALV1N0000001';
  }
});
