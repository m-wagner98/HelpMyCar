import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {DiagnosticTroubleCodeComponent} from './diagnostic-trouble-code.component';

import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {HttpClient} from '@angular/common/http';
import {Component} from '@angular/core';
import {TroubleCode} from '../../../shared/model/ApiResponse';


describe('DiagnosticTroubleCodeComponent', () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  // Test Host Component
  let testHostComponent: TestHostComponent;
  let testHostFixture: ComponentFixture<TestHostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DiagnosticTroubleCodeComponent, TestHostComponent],
      imports: [HttpClientTestingModule]
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
    template: `<app-diagnostic-trouble-code [troubleCode]="troubleCode"></app-diagnostic-trouble-code>`
  })
  class TestHostComponent {
    troubleCode: TroubleCode = {
      dtcId: 'DTC8888',
      ecuId: '',
      occurrences: 0,
      timestamp: '2020-05-08T08:04:37.867824411Z'
    };
  }
});
