import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {PersonalMenuComponent} from './personal-menu.component';

import {MatMenuModule} from '@angular/material/menu';

import {HttpClient, HttpClientModule} from '@angular/common/http';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';

describe('PersonalMenuComponent', () => {
  let component: PersonalMenuComponent;
  let fixture: ComponentFixture<PersonalMenuComponent>;

  let httpClient: HttpClientModule;
  let httpTestingController: HttpTestingController;

  const loginServiceSpy =
    jasmine.createSpyObj('LoginService', ['setStatusOfActiveRequest']);

  loginServiceSpy.setStatusOfActiveRequest.and.returnValue();


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PersonalMenuComponent],
      imports: [MatMenuModule, HttpClientModule, HttpClientTestingModule]
    })
      .compileComponents();
    // tslint:disable-next-line: deprecation
    httpClient = TestBed.get(HttpClient);
    // tslint:disable-next-line: deprecation
    httpTestingController = TestBed.get(HttpTestingController);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonalMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
