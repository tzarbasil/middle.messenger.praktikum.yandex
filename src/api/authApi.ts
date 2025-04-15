import { BaseApi } from './baseUrl';
import { HttpTransport } from '../services/HttpRequest';

export class AuthApi extends BaseApi {
  private _registerApi = new HttpTransport();

  loginUser(data: Record<string, string>) {
    return this._registerApi.post('auth/signin', {
      headers: {
        credentials: 'include',
        'Content-Type': 'application/json',
      },
      data,
    });
  }
}
