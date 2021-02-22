import {AfterViewChecked, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ChatMessage} from '../../../shared/model/ChatMessage';
import {LoginService} from '../../services/login.service';
import {ChatService} from '../../../shared/services/chat.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-driver-chat',
  templateUrl: './driver-chat.component.html',
  styleUrls: ['./driver-chat.component.scss']
})
export class DriverChatComponent implements OnInit, OnDestroy, AfterViewChecked {
  @ViewChild('scrollMe') private myScrollContainer: ElementRef;
  public typedMessage = '';
  public messages: ChatMessage[] = [];
  private subscription: Subscription;
  private disableScrollDown = false;

  constructor(
    private loginService: LoginService,
    private chatService: ChatService
  ) {
  }

  ngOnInit(): void {
    this.chatService.getMessages().subscribe(next => this.messages.push(next), err => console.log(err), () => this.onComplete());
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  ngAfterViewChecked(): void {
    this.scrollToBottom();
  }

  scrollToBottom(): void {
    if (this.disableScrollDown) {
      return;
    }
    try {
      this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
    } catch (err) {
    }
  }

  /**
   * Checks if the user is scrolling so that an automatic scroll to the bottom does not get triggered.
   */
  onScroll(): void {
    const element = this.myScrollContainer.nativeElement;
    const atBottom = element.scrollHeight - element.scrollTop === element.clientHeight;
    this.disableScrollDown = !(this.disableScrollDown && atBottom);
  }

  /**
   * Is called after all already existing messages are loaded so we can subscribe to new messages.
   */
  onComplete(): void {
    this.subscription = this.chatService.getMessagesObservable().subscribe(message => {
      this.messages.push(message);
      this.disableScrollDown = false;
      this.scrollToBottom();
    });
    console.log(this.messages);
  }

  onSendButton(): void {
    if (this.typedMessage) {
      const message: ChatMessage = {
        sender: this.loginService.getDriverInfo().user,
        message: this.typedMessage,
        receiver: 'AssistanceOperator'
      };
      this.chatService.sendMessage(message);
      this.typedMessage = '';
    }
  }

  onEnterDown(event: Event): void {
    event.preventDefault();
  }

}
