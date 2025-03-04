import { Authorization } from '../../components/LoginForm';
import { Button } from '../../components/LoginButton';
import { Form } from '../../components/MainForm';
import { Input } from '../../components/MainInput';
import { Link } from '../../components/MainButton';
import { Block } from '../../services/Block';
import { RegisterPageLayout } from './registerPage';

const registerFields = [
  {
    name: 'email', label: 'Почта', type: 'email', required: true,
  },
  {
    name: 'login', label: 'Логин', type: 'text', required: true,
  },
  {
    name: 'first_name', label: 'Имя', type: 'text', required: true,
  },
  {
    name: 'second_name', label: 'Фамилия', type: 'text', required: true,
  },
  {
    name: 'phone', label: 'Телефон', type: 'text', required: true,
  },
  {
    name: 'password', label: 'Пароль', type: 'password', required: true,
  },
  {
    name: 'repeatPassword',
    label: 'Пароль (ещё раз)',
    type: 'password',
    required: true,
  },
];

export class RegisterPage extends Block {
  constructor() {
    super({
      authorization: new Authorization({
        title: 'Регистрация',
        form: new Form({
          class: 'login-form',
          inputs: registerFields.map(
            (i) => new Input({ ...i, class: 'input_container' }),
          ),
          button: new Button({
            class: 'button main__form_auth_btn',
            text: 'Зарегистрироваться',
            type: 'submit',
          }),
        }),
        link: new Link({ text: 'Войти', href: '/login' }),
      }),
    });
  }

  override render() {
    return RegisterPageLayout;
  }
}
