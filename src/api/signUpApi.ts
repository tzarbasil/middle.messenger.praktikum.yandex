import { BaseApi } from './baseUrl';
import { HttpTransport } from '../services/HttpRequest';

export class SignUpApi extends BaseApi {
  private _registerApi = new HttpTransport();

  create(data: Record<string, string>) {
    return this._registerApi.post('auth/signup', {
      headers: {
        'Content-Type': 'application/json',
      },
      data,
    });
  }
}
