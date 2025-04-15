import { BaseApi } from './baseUrl';
import { HttpTransport } from '../services/HttpRequest';

export class ChatApi extends BaseApi {
  private _registerApi = new HttpTransport();

  createChat(data: Record<string, string>) {
    return this._registerApi.post('chats', {
      data,
      headers: { credentials: 'include', 'Content-Type': 'application/json' },
    });
  }

  request() {
    return this._registerApi.get('chats', { headers: { credentials: 'include' } });
  }

  getToken(chatId: number) {
    return this._registerApi.post(`chats/token/${chatId}`, { headers: { credentials: 'include' } });
  }

  getUsers(chatId: string) {
    return this._registerApi.get(`chats/${chatId}/users`, { headers: { credentials: 'include' } });
  }

  addUsers(chatId: number, userId: number) {
    return this._registerApi.put('chats/users', {
      data: { users: [userId], chatId },
      headers: { credentials: 'include', 'Content-Type': 'application/json' },
    });
  }

  deleteUsers(chatId: number, userId: number) {
    return this._registerApi.delete('chats/users', {
      data: { users: [userId], chatId },
      headers: { credentials: 'include', 'Content-Type': 'application/json' },
    });
  }
}
