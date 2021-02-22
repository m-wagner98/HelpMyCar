import {async, ComponentFixture, TestBed} from '@angular/core/testing';


import {TestData} from '../../../shared/model/TestData/TestData';
import {Driver} from '../../../shared/model/Driver';
import {LoginService} from '../../services/login.service';
import {ChatService} from '../../../shared/services/chat.service';
import {MatInputModule} from '@angular/material/input';
import {of} from 'rxjs';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {DriverChatComponent} from './driver-chat.component';

describe('DriverChatComponent', () => {
  let component: DriverChatComponent;
  let fixture: ComponentFixture<DriverChatComponent>;
  // Mock the LoginService
  const logInServiceSpy = jasmine.createSpyObj('LoginService', ['getDriverInfo']);
  const driverMock: Driver = TestData.DRIVER;
  logInServiceSpy.getDriverInfo.and.returnValue(driverMock);
  // Mock the ChatService
  const chatServiceSpy = jasmine.createSpyObj('ChatService', ['getMessages', 'getMessagesObservable', 'loadMessages']);
  const messagesMock = TestData.CHAT_MESSAGES;

  chatServiceSpy.getMessages.and.returnValue(of(messagesMock));
  chatServiceSpy.getMessagesObservable.and.returnValue(of(messagesMock));
  chatServiceSpy.loadMessages.and.returnValue();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DriverChatComponent],
      imports: [MatInputModule, BrowserAnimationsModule],
      providers: [
        {provide: LoginService, useValue: logInServiceSpy},
        {provide: ChatService, useValue: chatServiceSpy}
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DriverChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
