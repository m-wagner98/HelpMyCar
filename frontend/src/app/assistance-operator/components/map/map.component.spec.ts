import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {MapComponent} from './map.component';

import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {HttpClient} from '@angular/common/http';
import {Component, ViewChild} from '@angular/core';
import {TestData} from '../../../shared/model/TestData/TestData';
import {HelpRequestInformationService} from '../../services/help-request-information.service';

describe('MapComponent', () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  // Test Host Component
  let testHostComponent: TestHostComponent;
  let testHostFixture: ComponentFixture<TestHostComponent>;
  const helpService = jasmine.createSpyObj('HelpRequestInformationService', ['getRequest']);
  helpService.getRequest.and.returnValue(TestData.helpRequest[0]);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MapComponent, TestHostComponent],
      imports: [HttpClientTestingModule],
      providers: [{provide: HelpRequestInformationService, useValue: helpService}]
    })
      .compileComponents();
    // tslint:disable-next-line: deprecation
    httpClient = TestBed.get(HttpClient);
    // tslint:disable-next-line: deprecation
    httpTestingController = TestBed.get(HttpTestingController);
  }));

  beforeEach(() => {
    testHostFixture = TestBed.createComponent(TestHostComponent);
    testHostComponent = testHostFixture.componentInstance;
    testHostFixture.detectChanges();
    testHostComponent.mapComponent._id = 0;
  });

  it('should create', () => {
    expect(testHostComponent).toBeTruthy();
  });

  @Component({
    // tslint:disable-next-line:component-selector
    selector: `host-component`,
    template: `<app-map [id]="0"></app-map>`
  })
  class TestHostComponent {
    @ViewChild(MapComponent)
    public mapComponent: MapComponent;
  }
});
