import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {DriverStatusComponent} from './driver-status.component';
import {HttpClientModule} from '@angular/common/http';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {ReverseGeocodePipe} from '../start-page/reverse-geocode.pipe';

describe('DriverStatus', () => {
  let component: DriverStatusComponent;
  let fixture: ComponentFixture<DriverStatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DriverStatusComponent, ReverseGeocodePipe],
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [HttpClientModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DriverStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
