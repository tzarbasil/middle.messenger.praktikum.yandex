import { BaseApi } from './baseUrl';
import { HttpTransport } from '../services/HttpRequest';

export class EditProfileApi extends BaseApi {
  private _registerApi = new HttpTransport();

  updateProfile(data: Record<string, string>) {
    return this._registerApi.put('user/profile', {
      headers: { credentials: 'include', 'Content-Type': 'application/json' },
      data,
    });
  }

  updatePassword(data: Record<string, string>) {
    return this._registerApi.put('user/password', {
      headers: { credentials: 'include', 'Content-Type': 'application/json' },
      data,
    });
  }

  updateAvatar(data: FormData) {
    return this._registerApi.put('user/profile/avatar', {
      headers: { credentials: 'include' },
      data,
    });
  }
}
