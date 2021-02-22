import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {DiagnosticTroubleCodeListComponent} from './diagnostic-trouble-code-list.component';
import {HelpRequestInformationService} from '../../services/help-request-information.service';
import {TestData} from '../../../shared/model/TestData/TestData';

describe('DiagnosticTroubleCodeListComponent', () => {
  let component: DiagnosticTroubleCodeListComponent;
  let fixture: ComponentFixture<DiagnosticTroubleCodeListComponent>;

  const helpService = jasmine.createSpyObj('HelpRequestInformationService', ['getRequest']);
  helpService.getRequest.and.returnValue(TestData.helpRequest[0]);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DiagnosticTroubleCodeListComponent],
      providers: [{provide: HelpRequestInformationService, useValue: helpService}]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiagnosticTroubleCodeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
