import { BaseApi, BASE_URL } from './baseUrl.js';
import { HttpTransport } from '../services/HttpRequest.js';

export class ProfileApi extends BaseApi {
  private _registerApi = new HttpTransport();

  request() {
    return this._registerApi.get('auth/user', {});
  }

  getAvatarUrl(avatarPath: string | null) {
    return avatarPath ? `${BASE_URL}resources${avatarPath}` : '/default-avatar.png';
  }

  logOut() {
    return this._registerApi.post('auth/logout', {});
  }
}
