import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  websocket: WebSocket;

  constructor() { }

  connect(url: string): Observable<string> {
    this.websocket = new WebSocket(url);
    return new Observable(
      observer => {
        this.websocket.onopen = (event) => observer.next("Connected");
        this.websocket.onmessage = (event) => observer.next(event.data);
        this.websocket.onerror = (event) => observer.error(event);
        this.websocket.onclose = (event) => observer.complete();
      }
    );
  }

  send(message: any) {
    this.websocket.send(message);
  }

  disconnect() {
    this.websocket.close();
  }

}
