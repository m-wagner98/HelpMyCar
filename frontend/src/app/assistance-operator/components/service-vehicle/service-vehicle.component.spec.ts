import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ServiceVehicleComponent} from './service-vehicle.component';
import {MatDialogModule} from '@angular/material/dialog';
import {Component} from '@angular/core';
import {TestData} from '../../../shared/model/TestData/TestData';

describe('ServiceVehicleComponent', () => {
  // TestHostComponent
  let testHostComponent: TestHostComponent;
  let testHostFixture: ComponentFixture<TestHostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ServiceVehicleComponent, TestHostComponent],
      imports: [MatDialogModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    testHostFixture = TestBed.createComponent(TestHostComponent);
    testHostComponent = testHostFixture.componentInstance;
    testHostFixture.detectChanges();
  });

  it('should create', () => {
    expect(testHostComponent).toBeTruthy();
  });

  @Component({
    // tslint:disable-next-line:component-selector
    selector: `host-component`,
    template: `<app-service-vehicle [serviceVehicle]="serviceVehicle"></app-service-vehicle>`
  })
  class TestHostComponent {
    serviceVehicle = TestData.SERVICE_VEHICLE;
  }
});
