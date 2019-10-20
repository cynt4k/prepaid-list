import { IWebsocketService } from '../types/websocket.service';

export class WebsocketService implements IWebsocketService {
  initNewSocket(connectionString: string, callback: (data: MessageEvent) => void): void {
    const webSocket = new WebSocket(connectionString);

    webSocket.onopen = function(event) {
      webSocket.onmessage = function(this: WebSocket, data: MessageEvent): any {
        callback(data);
      };
    };
    webSocket.onclose = () => { this.initNewSocket(connectionString, callback); };
  }
}
