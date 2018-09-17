import { Component, OnInit } from '@angular/core';
import { WebsocketService } from './services/websocket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'websocket';
  private websocket: string = "wss://echo.websocket.org";
  private message: string = '';
  private output: string = '';
  private connected = false;
  private disconnected = false;

  constructor(private wsService: WebsocketService) {
  }

  ngOnInit() {
  }

  isEmpty(): boolean {
    return (this.websocket.length == 0) ? true : false;
  }

  onConnect() {
    this.output = '';
    this.connected = true;
    this.wsService.connect(this.websocket).subscribe(
      data => {
        this.output += data + '\n';
      },
      err => {
        this.output = 'Error occured:' + err.message;
      },
      () => {
        this.output += 'Disconnected.';
      }
    );
  }

  onSubmit() {
    this.wsService.send(this.message);
  }

  onDisconnect() {
    this.connected = false;
    this.disconnected = true;
    this.message = '';
    this.wsService.disconnect();
  }
}
