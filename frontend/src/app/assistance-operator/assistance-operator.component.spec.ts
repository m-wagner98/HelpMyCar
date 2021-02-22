import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {AssistanceOperatorComponent} from './assistance-operator.component';
import {RouterTestingModule} from '@angular/router/testing';
import {HelpRequestInformationService} from './services/help-request-information.service';
import {TestData} from '../shared/model/TestData/TestData';
import {StatusService} from '../shared/services/status.service';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';

describe('AssistanceOperatorComponent', () => {
  let component: AssistanceOperatorComponent;
  let fixture: ComponentFixture<AssistanceOperatorComponent>;

  let httpClient: HttpClientModule;
  let httpTestingController: HttpTestingController;
  // Mock HelpRequestInformationService
  const helpRequestServiceSpy =
    jasmine.createSpyObj('HelpRequestInformationService', ['getRequest']);
  const helpRequestMock = TestData.helpRequest;
  helpRequestServiceSpy.getRequest.and.returnValue(helpRequestMock);
  // Mock StatusService
  const statusServiceSpy = jasmine.createSpyObj('StatusService', ['updateStatus', 'connectToSocket']);

  statusServiceSpy.connectToSocket.and.returnValue();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AssistanceOperatorComponent],
      imports: [RouterTestingModule, HttpClientModule, HttpClientTestingModule],
      providers: [
        {provide: HelpRequestInformationService, useValue: helpRequestServiceSpy},
        {provide: StatusService, useValue: statusServiceSpy}
      ]
    })
      .compileComponents();
    // tslint:disable-next-line: deprecation
    httpClient = TestBed.get(HttpClient);
    // tslint:disable-next-line: deprecation
    httpTestingController = TestBed.get(HttpTestingController);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssistanceOperatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

