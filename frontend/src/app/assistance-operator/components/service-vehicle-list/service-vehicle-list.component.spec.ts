import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ServiceVehicleListComponent} from './service-vehicle-list.component';

import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {HttpClient} from '@angular/common/http';
import {TestData} from '../../../shared/model/TestData/TestData';
import {StatusService} from '../../../shared/services/status.service';
import {Component} from '@angular/core';
import {HelpRequestInformationService} from '../../services/help-request-information.service';


describe('ServiceVehicleListComponent', () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  // Test Host Component
  let testHostComponent: TestHostComponent;
  let testHostFixture: ComponentFixture<TestHostComponent>;

  const statusServiceSpy =
    jasmine.createSpyObj('StatusService', ['updateStatus']);
  statusServiceSpy.updateStatus.and.returnValue('OPEN');

  const helpServiceSpy = jasmine.createSpyObj('HelpRequestInformationService', ['getRequest']);
  helpServiceSpy.getRequest.and.returnValue(TestData.helpRequest[0]);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ServiceVehicleListComponent, TestHostComponent],
      imports: [HttpClientTestingModule],
      providers: [{provide: StatusService, useValue: statusServiceSpy},
        {provide: HelpRequestInformationService, useValue: helpServiceSpy}
      ]
    })
      .compileComponents();
    httpClient = TestBed.get(HttpClient);
    httpTestingController = TestBed.get(HttpTestingController);
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
    template: `<app-service-vehicle-list [id]="0"></app-service-vehicle-list>`
  })
  class TestHostComponent {
  }
});
