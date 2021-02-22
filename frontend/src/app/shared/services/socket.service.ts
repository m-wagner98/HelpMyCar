import {Injectable} from '@angular/core';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import {Subject} from 'rxjs';
import {GlobalConstants} from '../GlobalConstants';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  private socketEndpoint = GlobalConstants.apiURL + '/requests';
  private client: Stomp.Client;
  private connection = new Subject<boolean>();
  private subscriptions: Stomp.Subscription[] = [];

  constructor() {
    // this.client = this.createStompClient();
    // this.client.connect({}, () => {
    //   this.connection.next(true);
    //   console.log('connected');
    // });
  }

  public createStompClient() {
    const socket = new SockJS(this.socketEndpoint);
    return Stomp.over(socket);
  }

  /**
   * Sends a message to the /requests socket endpoint.
   * @param socketChannel specifies which channel it uses to send the message
   * @param header specifies the header information
   * @param body specifies the payload of the message
   */
  public sendMessage(socketChannel: string, header: {}, body: string) {
    if (!this.client.connected) {
      this.connection.asObservable().subscribe(() => {
        this.client.send(socketChannel, header, body);
      });
      return;
    }
    this.client.send(socketChannel, header, body);
  }

  /**
   * Subscribe to a socket channel.
   * @param destination specifies the destination
   * @param callback specifies the handler method for the subscription
   */
  public subscribeToDestination(destination: string, callback: (message: Stomp.Message) => any) {
    if (!this.client.connected) {
      this.connection.asObservable().subscribe(() => {
        this.subscriptions.push(this.client.subscribe(destination, callback));
      });
      return;
    }
    this.subscriptions.push(this.client.subscribe(destination, callback));
  }

  public unsubscribeAll(): void {
    for (const sub of this.subscriptions) {
      sub.unsubscribe();
    }
  }
}
