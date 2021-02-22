import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {DriverInfoComponent} from './driver-info.component';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('DriverInfoComponent', () => {
  let component: DriverInfoComponent;
  let fixture: ComponentFixture<DriverInfoComponent>;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DriverInfoComponent],
      imports: [HttpClientTestingModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DriverInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
