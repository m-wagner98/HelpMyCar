import {FilterPipe} from '../filter/filter.pipe';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {RequestListComponent} from './request-list.component';

import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {HttpClient} from '@angular/common/http';
import {MatDialog} from '@angular/material/dialog';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';


describe('RequestListComponent', () => {
  let component: RequestListComponent;
  let fixture: ComponentFixture<RequestListComponent>;

  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  // Mock MatDialogRef
  const mockDialogRef = {
    close: jasmine.createSpy('close')
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RequestListComponent, FilterPipe],
      imports: [HttpClientTestingModule, BrowserAnimationsModule],
      providers: [{provide: MatDialog, useValue: mockDialogRef}]
    })
      .compileComponents();
    httpClient = TestBed.get(HttpClient);
    httpTestingController = TestBed.get(HttpTestingController);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
