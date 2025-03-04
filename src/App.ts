import * as Pages from './pages';

import { Block } from './services/Block';

type Routes =
| '/'
| '/login'
| '/register'
| '/profile'
| '/edit-profile'
| '/change-password'
| '/messanger'
| '/messanger_user'
| '/404'
| '/500';

export class App {
  protected appElement: HTMLElement | null;

  constructor() {
    this.appElement = document.getElementById('app');
  }

  public render() {
    let page: Block | null;

    switch (window.location.pathname as Routes) {
      case '/':
        page = new Pages.NavigationPage();
        break;

      case '/login':
        page = new Pages.LoginPage();
        break;

      case '/register':
        page = new Pages.RegisterPage();
        break;

      case '/profile':
        page = new Pages.ProfilePage();
        break;

      case '/edit-profile':
        page = new Pages.ProfileEditPage();
        break;

      case '/change-password':
        page = new Pages.PasswordPage();
        break;

      case '/messanger':
        page = new Pages.MessangerPage();
        break;

      case '/messanger_user':
        page = new Pages.MessangerPageChat();
        break;

      case '/404':
        page = new Pages.Error404();
        break;

      case '/500':
        page = new Pages.Error505();
        break;

      default:
        page = new Pages.Error404();
        break;
    }
    if (this.appElement) {
      this.appElement.replaceChildren(page.updateElement());
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const app = new App();
  app.render();
});
