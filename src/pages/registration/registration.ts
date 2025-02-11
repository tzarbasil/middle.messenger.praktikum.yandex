import { RegistrationPage } from './RegistrationPage';

document.addEventListener('DOMContentLoaded', () => {
  const app = document.getElementById('app'); // Или другой контейнер в login.html
  if (app) {
    const registrationPageInstance = new RegistrationPage();
    app.appendChild(registrationPageInstance.getElement());
  }
});
