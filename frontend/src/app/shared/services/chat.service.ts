import {Injectable} from '@angular/core';
import {ChatMessage} from '../model/ChatMessage';
import {SocketService} from './socket.service';
import * as Stomp from 'stompjs';
import {LoginService} from 'src/app/driver/services/login.service';
import {Observable, Observer, Subject} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {GlobalConstants} from '../GlobalConstants';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private url = GlobalConstants.apiURL;
  client: Stomp.Client;
  messagesSubject = new Subject<ChatMessage>();
  private localMessageList: ChatMessage[];

  constructor(
    private socketService: SocketService,
    private loginService: LoginService,
    private http: HttpClient
  ) {
  }

  /**
   * Listen for new Chat messages.
   */
  listenForChanges() {
    // const destination = '/topic/chatMessages';
    // this.socketService.subscribeToDestination(destination,
    //   (message) => this.filterMessage(JSON.parse(message.body), this.messagesSubject));

    // init status updates
    this.http.get<ChatMessage[]>(this.url + '/getMessageList').subscribe(messageList => this.localMessageList = messageList);

    setInterval(() => {
      this.http.get<ChatMessage[]>(this.url + '/getMessageList')
        .subscribe(messageList => {
          // check if there are new messages
          if (this.localMessageList && messageList.length > this.localMessageList.length) {
            messageList.slice(this.localMessageList.length)
              .forEach(message => this.filterMessage(message, this.messagesSubject));
          }

          // update the local list in case a new messages came
          this.localMessageList = messageList;
        });
    }, 100);
  }

  /**
   * Filters incoming messages so that only the addressed user and the sender receive them.
   * @param chatMessage that gets filtered
   * @param observable for chat messages.
   */
  filterMessage(chatMessage: ChatMessage, observable: Observer<ChatMessage>): void {
    const driverInfo = this.loginService.getDriverInfo();
    if (driverInfo === undefined) {
      observable.next(chatMessage);
    } else if (chatMessage.receiver === driverInfo.user ||
      chatMessage.sender === driverInfo.user) {
      observable.next(chatMessage);
    }
  }

  /**
   * Load all chat messages from backend.
   */
  getMessages(): Observable<ChatMessage> {
    return new Observable((subscriber) => {
      this.loadMessages((value) => value.forEach((message) => this.filterMessage(message, subscriber)), () => subscriber.complete());
    });
  }

  getMessagesObservable(): Observable<ChatMessage> {
    return this.messagesSubject.asObservable();
  }

  /**
   * Gets already sent messages from the backend.
   * @param callback function that gets executed after the response.
   * @param complete status of request.
   */
  loadMessages(callback: (value: ChatMessage[]) => void, complete?: () => void): void {
    this.http.get<ChatMessage[]>(this.url + '/getMessageList').subscribe(callback, err => console.log(err), complete);
  }

  /**
   * Sends a chat message to the chat socket channel.
   * @param chatMessage Chat message obj
   */
  sendMessage(chatMessage: ChatMessage) {
    // const destination = '/app/chat';
    // this.socketService.sendMessage(destination, {}, JSON.stringify(chatMessage));

    this.http.post(this.url + `/addChatMessage`, chatMessage).subscribe();
  }
}
