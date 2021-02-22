import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {StatusComponent} from './status.component';
import {HelpRequest} from 'src/app/shared/model/HelpRequest';
import {HelpRequestInformationService} from '../../services/help-request-information.service';

import {TestData} from '../../../shared/model/TestData/TestData';
import {StatusService} from '../../../shared/services/status.service';
import {of} from 'rxjs';


describe('StatusComponent', () => {
  let component: StatusComponent;
  let fixture: ComponentFixture<StatusComponent>;
  const helpRequest: HelpRequest[] = TestData.helpRequest;

  const helpRequestServiceSpy =
    jasmine.createSpyObj('HelpRequestInformationService', ['getRequest']);

  const statusServiceSpy =
    jasmine.createSpyObj('StatusService', ['getTranslation', 'getStatus', 'getIndex']);

  helpRequestServiceSpy.getRequest.and.returnValue(helpRequest);
  statusServiceSpy.getTranslation.and.returnValue('Request in progress');
  statusServiceSpy.getStatus.and.returnValue(of(helpRequest[0].status));
  statusServiceSpy.getIndex.and.returnValue(0);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [StatusComponent],
      providers: [{provide: HelpRequestInformationService, useValue: helpRequestServiceSpy},
        {provide: StatusService, useValue: statusServiceSpy}
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create ', () => {
    component._id = 1;
    component.helpRequest = helpRequestServiceSpy.getRequest();
    component.helpRequest.status = 'Request in progress';
    // expect(hostFixture.nativeElement.querySelector('div').innerText).toEqual(1);
    expect(component).toBeDefined();
  });
});
