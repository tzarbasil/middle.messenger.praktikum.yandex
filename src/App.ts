import { router } from './services/Router';
import * as Pages from './pages';

export class App {
  static init() {
    router
      .use('/', Pages.LoginPage)
      .use('/sign-up', Pages.RegisterPage)
      .use('/settings', Pages.ProfilePage)
      .use('/edit-password', Pages.PasswordPage)
      .use('/messenger', Pages.MessangerPage)
      .use('/404', Pages.Error404)
      .use('/505', Pages.Error505)
      .start();
  }
}

document.addEventListener('DOMContentLoaded', () => {
  App.init();
});
