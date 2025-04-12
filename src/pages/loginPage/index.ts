import { Authorization } from '../../components/LoginForm';
import { Button } from '../../components/LoginButton';
import { Form } from '../../components/MainForm';
import { Input } from '../../components/MainInput';
import { Link } from '../../components/MainButton';
import { Block } from '../../services/Block';
import { LoginPageLayout } from './loginPage';
import { AuthApi } from '../../api/authApi';
import { router } from '../../services/Router';

export class LoginPage extends Block {
  private AuthApi: AuthApi;

  constructor() {
    const loginFields = [
      {
        name: 'login', label: 'Логин', type: 'text', required: true,
      },
      {
        name: 'password', label: 'Пароль', type: 'password', required: true,
      },
    ];

    super({
      authorization: new Authorization({
        title: 'Вход',
        form: new Form({
          class: 'login-form',
          inputs: loginFields.map(
            (i) => new Input({
              ...i,
              class: 'input_container',
            }),
          ),
          button: new Button({
            class: 'main__form_auth_btn',
            text: 'Авторизоваться',
            type: 'submit',
          }),
        }),
        link: new Link({ text: 'Нет аккаунта?', href: '/sign-up' }),
      }),
      events: {
        submit: (event: Event) => this.handleLogin(event),
      },
    });

    this.AuthApi = new AuthApi();
  }

  async handleLogin(event: Event) {
    event.preventDefault();

    const form = this.element?.querySelector('form');
    if (!form) return;

    const formData = new FormData(form);
    const data: Record<string, string> = {};
    formData.forEach((value, key) => {
      data[key] = value as string;
    });

    try {
      const response = await this.AuthApi.loginUser({
        login: data.login,
        password: data.password,
      });

      if (response.status === 200) {
        console.log('Авторизация прошла успешно');
        router.go('/messenger');
      } else {
        console.error('Ошибка авторизации', response);
        alert('Неверный логин или пароль');
      }
    } catch (error) {
      console.error('Ошибка при попытке авторизации:', error);
      alert('Ошибка при авторизации');
    }
  }

  override render() {
    return LoginPageLayout;
  }
}
