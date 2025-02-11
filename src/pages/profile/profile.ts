import { ProfilePage } from './profilePage';

document.addEventListener('DOMContentLoaded', () => {
  const profileContainer = document.getElementById('app');
  if (profileContainer) {
    const profilePageInstance = new ProfilePage();
    profileContainer.appendChild(profilePageInstance.getElement());
  } else {
    console.error('Не найден контейнер #profile для рендеринга!');
  }
});
