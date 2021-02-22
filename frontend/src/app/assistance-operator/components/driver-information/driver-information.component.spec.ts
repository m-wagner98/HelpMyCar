import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {DriverInformationComponent} from './driver-information.component';

import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {HttpClient} from '@angular/common/http';

describe('DriverInformationComponent', () => {
  let component: DriverInformationComponent;
  let fixture: ComponentFixture<DriverInformationComponent>;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DriverInformationComponent],
      imports: [HttpClientTestingModule]
    })
      .compileComponents();
    httpClient = TestBed.get(HttpClient);
    httpTestingController = TestBed.get(HttpTestingController);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DriverInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
