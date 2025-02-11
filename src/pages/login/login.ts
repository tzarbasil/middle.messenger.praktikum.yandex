import { LoginPage } from './LoginPage';

document.addEventListener('DOMContentLoaded', () => {
  const app = document.getElementById('app');
  if (app) {
    const loginPage = new LoginPage();
    app.appendChild(loginPage.getElement());
  }
});
