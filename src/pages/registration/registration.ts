import { RegistrationPage } from './RegistrationPage';

document.addEventListener('DOMContentLoaded', () => {
  const app = document.getElementById('app'); 
  if (app) {
    const registrationPageInstance = new RegistrationPage();
    app.appendChild(registrationPageInstance.getElement());
  }
});
