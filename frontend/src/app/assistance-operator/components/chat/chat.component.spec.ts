import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ChatComponent} from './chat.component';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {Component} from '@angular/core';
import {HelpRequestInformationService} from '../../services/help-request-information.service';
import {TestData} from '../../../shared/model/TestData/TestData';


describe('ChatComponent', () => {
  let httpClient: HttpClientModule;

  // Test Host Component
  let testHostComponent: TestHostComponent;
  let testHostFixture: ComponentFixture<TestHostComponent>;

  const helpServiceSpy = jasmine.createSpyObj('HelpRequestInformationService', ['getRequest', 'findAUsersHelpRequests']);
  helpServiceSpy.getRequest.and.returnValue(TestData.helpRequest[0]);
  helpServiceSpy.findAUsersHelpRequests.and.returnValue();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ChatComponent, TestHostComponent],
      imports: [HttpClientTestingModule],
      providers: [{provide: HelpRequestInformationService, useValue: helpServiceSpy}]
    })
      .compileComponents();
    httpClient = TestBed.get(HttpClient);
  }));

  beforeEach(() => {
    testHostFixture = TestBed.createComponent(TestHostComponent);
    testHostComponent = testHostFixture.componentInstance;
    testHostFixture.detectChanges();
  });

  xit('should create', () => {
    expect(testHostComponent).toBeTruthy();
  });

  @Component({
    // tslint:disable-next-line:component-selector
    selector: `host-component`,
    template: `<app-chat [id]="0"></app-chat>`
  })
  class TestHostComponent {
  }
});
