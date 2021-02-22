import {AfterViewChecked, Component, ElementRef, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ChatService} from 'src/app/shared/services/chat.service';
import {ChatMessage} from 'src/app/shared/model/ChatMessage';
import {HelpRequestInformationService} from '../../services/help-request-information.service';
import {HelpRequest} from 'src/app/shared/model/HelpRequest';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit, OnDestroy, AfterViewChecked {
  public typedMessage: string;
  public id: number;

  @Input('id') set _id(value: number) {
    this.id = value;
    this.helpRequest = this.helpRequestInformationService.getRequest(this.id);
  }

  public helpRequest: HelpRequest;
  public messages: ChatMessage[] = [];
  public expanded = false;
  public arrowClass = '';
  public slideUpClass = '';
  public nrOfNewMessages: number[] = [];
  @ViewChild('scrollMe') private myScrollContainer: ElementRef;
  private subscription: Subscription;
  private disableScrollDown = false;

  constructor(
    private chatService: ChatService,
    private helpRequestInformationService: HelpRequestInformationService
  ) {
  }

  ngOnInit(): void {
    // get old badge counter
    const nrOfNewMessages = JSON.parse(sessionStorage.getItem('nrOfNewMessages'));
    this.nrOfNewMessages = nrOfNewMessages ? nrOfNewMessages : [];
    // get how many messages where recorded last time the site was open
    const nrOfRecentMessages = JSON.parse(sessionStorage.getItem('nrOfRecentMessages'));
    this.chatService.getMessages().subscribe(next => {
      this.addMessage(next);
      // add a new message badge if there are more messages then last time
      if (nrOfRecentMessages && this.messages.length > nrOfRecentMessages) {
        this.determineBadgeNumber(next);
      }
    }, err => console.log(err), () => this.onComplete());
  }

  ngAfterViewChecked(): void {
    this.scrollToBottom();
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
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
      this.addMessage(message);
      this.determineBadgeNumber(message);
      this.disableScrollDown = false;
      this.scrollToBottom();
      sessionStorage.setItem('nrOfRecentMessages', JSON.stringify(this.messages.length));
    });
  }

  // trigger animations and reset badge
  expand(): void {
    this.expanded = !this.expanded;
    if (this.expanded) {
      this.arrowClass = 'rotate-180';
      this.slideUpClass = 'slide-up-bottom';
      this.helpRequestInformationService.findAUsersHelpRequests(this.helpRequest.driver.user).forEach(id => {
        this.nrOfNewMessages[id] = 0;
        sessionStorage.setItem('nrOfNewMessages', JSON.stringify(this.nrOfNewMessages));
      });
    } else {
      this.arrowClass = '';
      this.slideUpClass = '';
    }
  }

  onSendButton(): void {
    if (this.typedMessage) {
      const message: ChatMessage = {
        sender: 'AssistanceOperator',
        message: this.typedMessage,
        receiver: this.helpRequest.driver.user
      };
      this.chatService.sendMessage(message);
      this.typedMessage = '';
    }
  }

  onEnterDown(event: Event): void {
    event.preventDefault();
  }

  private addMessage(message: ChatMessage): void {
    this.messages.push(message);
  }

  private determineBadgeNumber(message: ChatMessage): void {
    if (!this.expanded && message.sender !== 'AssistanceOperator') {
      this.helpRequestInformationService.findAUsersHelpRequests(message.sender).forEach(id => {
        if (this.nrOfNewMessages[id]) {
          this.nrOfNewMessages[id]++;
        } else {
          this.nrOfNewMessages[id] = 1;
        }
      });
      sessionStorage.setItem('nrOfNewMessages', JSON.stringify(this.nrOfNewMessages));
    }
  }
}
