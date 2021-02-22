import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {RequestComponent, StatusColor} from './request.component';

import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {HttpClient} from '@angular/common/http';
import {TestData} from '../../../shared/model/TestData/TestData';
import {Component} from '@angular/core';


describe('RequestComponent', () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  // Test Host Component
  let testHostComponent: TestHostComponent;
  let testHostFixture: ComponentFixture<TestHostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RequestComponent, StatusColor, TestHostComponent],
      imports: [HttpClientTestingModule],
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
  });

  it('should create', () => {
    expect(testHostComponent).toBeTruthy();
  });

  @Component({
    // tslint:disable-next-line:component-selector
    selector: `host-component`,
    template: `
      <app-request [helpRequest]="helpRequest"></app-request>`
  })
  class TestHostComponent {
    helpRequest = TestData.helpRequest[0];
  }
});
