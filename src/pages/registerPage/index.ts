import { Authorization } from '../../components/LoginForm';
import { Button } from '../../components/LoginButton';
import { Form } from '../../components/MainForm';
import { Input } from '../../components/MainInput';
import { Link } from '../../components/MainButton';
import { Block } from '../../services/Block';
import { RegisterPageLayout } from './registerPage';
import { SignUpApi } from '../../api/signUpApi';
import { router } from '../../services/Router';

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
    name: 'repeatPassword', label: 'Пароль (ещё раз)', type: 'password', required: true,
  },
];

export class RegisterPage extends Block {
  private registerApi = new SignUpApi();

  constructor() {
    super({
      authorization: new Authorization({
        title: 'Регистрация',
        form: new Form({
          class: 'login-form',
          inputs: registerFields.map((i) => new Input({ ...i, class: 'input_container' })),
          button: new Button({
            class: 'button main__form_auth_btn',
            text: 'Зарегистрироваться',
            type: 'submit',
          }),
        }),
        link: new Link({ text: 'Войти', href: '/login' }),
      }),
      events: {
        submit: (event: Event) => this.handleRegister(event),
      },
    });
  }

  async handleRegister(event: Event) {
    event.preventDefault();

    const form = this.element?.querySelector('form');
    if (!form) return;

    const formData = new FormData(form);
    const data: Record<string, string> = {};
    formData.forEach((value, key) => {
      data[key] = value as string;
    });

    if (data.password !== data.repeatPassword) {
      console.error('Пароли не совпадают');
      return;
    }
    delete data.repeatPassword;

    try {
      const response = await this.registerApi.create(data);
      if (response.status === 200) {
        console.log('Регистрация прошла успешно');
        router.go('/messenger');
      } else {
        console.error('Ошибка регистрации', response.responseText);
      }
    } catch (error) {
      console.error('Ошибка при попытке регистрации:', error);
    }
  }

  override render() {
    return RegisterPageLayout;
  }
}
