import { Authorization } from '../../components/LoginForm';
import { Button } from '../../components/LoginButton';
import { Form } from '../../components/MainForm';
import { Input } from '../../components/MainInput';
import { Link } from '../../components/MainButton';
import { Block } from '../../services/Block';
import { LoginPageLayout } from './loginPage';

export class LoginPage extends Block {
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
        link: new Link({ text: 'Нет аккаунта?', href: '/register' }),
      }),
    });
  }

  override render() {
    return LoginPageLayout;
  }
}
