import { LoginPage } from './LoginPage';

document.addEventListener('DOMContentLoaded', () => {
  const app = document.getElementById('app'); // Или другой контейнер в login.html
  if (app) {
    const loginPage = new LoginPage();
    app.appendChild(loginPage.getElement());
  }
});
