
export interface IWebsocketService {
    initNewSocket(connectionString: string, callback: (data: MessageEvent) => void): void;
}
