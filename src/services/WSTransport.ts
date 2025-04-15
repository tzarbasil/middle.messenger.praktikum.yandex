import { EventBus } from './EventBus';
import { ChatApi } from '../api/chatApi';

type Message = {
  content: string;
  type: string;
};

export class MessageSocket {
  private socket: WebSocket | null = null;

  private chatId: number;

  private userId: number;

  private token: string | null = null;

  private reconnectTimeout = 3000;

  private eventBus = new EventBus();

  private pingInterval: ReturnType<typeof setInterval> | null = null;

  constructor(chatId: number, userId: number) {
    this.chatId = chatId;
    this.userId = userId;

    this.init();
  }

  private async init() {
    try {
      const chatApi = new ChatApi();
      const res = await chatApi.getToken(this.chatId);
      const { token } = JSON.parse(res.response);
      this.token = token;

      this.connect();
    } catch (error) {
      console.error('Не удалось получить токен для WebSocket', error);
    }
  }

  private connect() {
    if (!this.token) return;

    const url = `wss://ya-praktikum.tech/ws/chats/${this.userId}/${this.chatId}/${this.token}`;
    this.socket = new WebSocket(url);

    this.socket.addEventListener('open', () => {
      console.log('WebSocket подключён');
      this.pingInterval = setInterval(() => {
        this.send({ type: 'ping', content: '' });
      }, 10000);

      this.send({ type: 'get old', content: '0' });
    });

    this.socket.addEventListener('message', (event) => {
      let data;

      try {
        data = JSON.parse(event.data);
      } catch (error) {
        console.error('Не удалось распарсить сообщение:', event.data, error);
        return;
      }

      if (data.type === 'pong') {
        return;
      }

      if (Array.isArray(data)) {
        this.eventBus.emit('messages:batch', data);
      } else {
        this.eventBus.emit('messages:new', data);
      }
    });

    this.socket.addEventListener('close', (event) => {
      console.warn('WebSocket закрыт', event.code, event.reason);
      this.cleanup();
      setTimeout(() => this.init(), this.reconnectTimeout);
    });

    this.socket.addEventListener('error', (event) => {
      console.error('WebSocket ошибка', event);
    });
  }

  public send(message: Message) {
    if (this.socket?.readyState === WebSocket.OPEN) {
      this.socket.send(JSON.stringify({
        content: message.content,
        type: message.type,
      }));
    } else {
      console.warn('Сокет не готов к отправке сообщений');
    }
  }

  public subscribe(event: 'messages:new' | 'messages:batch', callback: (data: any) => void) {
    this.eventBus.on(event, callback);
  }

  public unsubscribe(event: 'messages:new' | 'messages:batch', callback: (data: any) => void) {
    this.eventBus.off(event, callback);
  }

  public close() {
    this.cleanup();
    this.socket?.close();
  }

  private cleanup() {
    if (this.pingInterval) {
      clearInterval(this.pingInterval);
      this.pingInterval = null;
    }
  }
}
