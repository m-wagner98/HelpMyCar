import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {CheckControlMessageComponent} from './check-control-message.component';

describe('CheckControlMessageComponent', () => {
  let component: CheckControlMessageComponent;
  let fixture: ComponentFixture<CheckControlMessageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CheckControlMessageComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckControlMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
