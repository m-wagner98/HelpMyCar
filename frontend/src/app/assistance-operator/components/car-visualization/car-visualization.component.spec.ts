import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {CarVisualizationComponent} from './car-visualization.component';
import {HelpRequestInformationService} from '../../services/help-request-information.service';
import {TestData} from '../../../shared/model/TestData/TestData';

describe('CarVisualizationComponent', () => {
  let component: CarVisualizationComponent;
  let fixture: ComponentFixture<CarVisualizationComponent>;

  // mock HelpRequestInfoService
  const helpRequestInfoSpy = jasmine.createSpyObj('HelpRequestInformationService', ['getRequest']);
  helpRequestInfoSpy.getRequest.and.returnValue(TestData.helpRequest[0]);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CarVisualizationComponent],
      providers: [{provide: HelpRequestInformationService, useValue: helpRequestInfoSpy}]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarVisualizationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
