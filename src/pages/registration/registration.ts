import Handlebars from 'handlebars';
import { EventBus } from '../../services/EventBus';
import { Input, InputEventBus } from '../../services/Input';
import { validateField } from '../../services/validation';

interface Context {
  title: string;
  fields: InputEventBus[];
  authButton: string;
  authButtonLink: string;
  regButton: string;
  regButtonLink: string;
}

const context: Context = {
  title: 'Регистрация',
  fields: [
    {
      label: 'Имя', type: 'text', name: 'first_name', placeholder: 'Имя',
    },
    {
      label: 'Фамилия',
      type: 'text',
      name: 'second_name',
      placeholder: 'Фамилия',
    },
    {
      label: 'Логин', type: 'text', name: 'login', placeholder: 'Логин',
    },
    {
      label: 'Почта', type: 'text', name: 'email', placeholder: 'Почта',
    },
    {
      label: 'Пароль',
      type: 'password',
      name: 'password',
      placeholder: 'Пароль',
    },
    {
      label: 'Телефон',
      type: 'tel',
      name: 'phone',
      placeholder: 'Телефон',
    },
  ],
  authButton: 'Зарегистрироваться',
  regButton: 'Войти',
  authButtonLink: '/src/pages/chat/chat.html',
  regButtonLink: '/src/pages/login/login.html',
};

const templateSource = `
<main class="login_page">
  <form class="main__form" id="registrationForm">
    <h2 class="main__form_title">{{title}}</h2>
    <div class="main__form_inputs" id="input-render"></div>
    <div class="btn_container">
        <button type="submit" class="main__form_auth_btn">{{authButton}}</button>
        <a href="{{regButtonLink}}" class="main__form_reg_btn route_button">{{regButton}}</a>
    </div>
  </form>
</main>
`;

const authElement = document.getElementById('registration');
const eventBus = new EventBus();

const template = Handlebars.compile(templateSource);
const html = template(context);

if (authElement) {
  authElement.innerHTML = html;

  const renderInput = document.getElementById('input-render');

  if (renderInput) {
    context.fields.forEach((field) => {
      const inputItem = new Input(field, eventBus);
      const inputElement = inputItem.getElement();

      const errorElement = document.createElement('span');
      errorElement.classList.add('main__form__error_message');
      errorElement.id = `${field.name}Error`;

      const wrapper = document.createElement('div');
      wrapper.classList.add('input-wrapper');
      wrapper.appendChild(inputElement);
      wrapper.appendChild(errorElement);

      renderInput.appendChild(wrapper);
    });
  }
}

document.querySelectorAll<HTMLInputElement>('.input-wrapper input').forEach((input) => {
  input.addEventListener('blur', (e) => {
    const target = e.target as HTMLInputElement;
    const field = target.name;
    const { value } = target;
    const error = validateField(field, value);

    const errorElement = document.getElementById(`${field}Error`);
    if (errorElement) {
      errorElement.textContent = error;
    }

    if (error) {
      console.error(`Ошибка в поле ${field}: ${error}`);
    }
  });
});

const form = document.getElementById('registrationForm') as HTMLFormElement;
if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    let isValid = true;
    const formData: Record<string, string> = {};

    document.querySelectorAll<HTMLInputElement>('.input-wrapper input').forEach((input) => {
      const field = input.name;
      const { value } = input;
      const error = validateField(field, value);

      const errorElement = document.getElementById(`${field}Error`);
      if (errorElement) {
        if (error) {
          isValid = false;
          errorElement.textContent = error;
        } else {
          errorElement.textContent = '';
        }
      }

      formData[field] = value;
    });

    if (isValid) {
      console.log('Форма успешно отправлена:', formData);
      window.location.href = context.authButtonLink;
    } else {
      console.error('Форма содержит ошибки');
    }
  });
}
