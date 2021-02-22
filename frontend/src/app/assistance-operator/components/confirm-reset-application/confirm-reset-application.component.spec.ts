import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ConfirmResetApplicationComponent} from './confirm-reset-application.component';
import {MatDialogModule, MatDialogRef} from '@angular/material/dialog';

describe('ConfirmResetApplicationComponent', () => {
  let component: ConfirmResetApplicationComponent;
  let fixture: ComponentFixture<ConfirmResetApplicationComponent>;

  // Mock MatDialogRef
  const mockDialogRef = {
    close: jasmine.createSpy('close')
  };
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ConfirmResetApplicationComponent],
      imports: [MatDialogModule],
      providers: [{provide: MatDialogRef, useValue: mockDialogRef}]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmResetApplicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
