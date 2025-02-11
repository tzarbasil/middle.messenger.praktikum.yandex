import Handlebars from 'handlebars';
import './assets/fonts.scss';

import { LoginPage } from './pages/login/LoginPage';

const templateSource = `
<main class="navigation_page">
    <nav>
        <ul>
            <li><a href="/src/pages/login/login.html" class="navigation_link" data-current_page="login_page">Авторизация</a></li>
            <li><a href="/src/pages/registration/register_page.html" data-current_page="register_page">Регистрация</a></li>
            <li><a href="/src/pages/profile/profile.html" class="navigation_link" data-current_page="profile__page">Профиль</a></li>
            <li><a href="/src/pages/chat/chat.html" class="navigation_link" data-current_page="messanger_page">Чат</a></li>
            <li><a href="/src/pages/error404page/error404page.html" class="navigation_link" data-current_page="error_page_500">404</a></li>
        </ul>
    </nav>
</main>
`;

const appContainer = document.getElementById('auth');

if (appContainer) {
  const loginPage = new LoginPage();
  appContainer.appendChild(loginPage.getElement());
}

const authElement = document.getElementById('mainpage');

if (authElement) {
  const template = Handlebars.compile(templateSource);
  authElement.innerHTML = template({});
}
