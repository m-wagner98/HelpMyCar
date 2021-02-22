import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {PrivacyServiceComponent} from './privacy-service.component';

describe('PrivacyServiceComponent', () => {
  let component: PrivacyServiceComponent;
  let fixture: ComponentFixture<PrivacyServiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PrivacyServiceComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrivacyServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
