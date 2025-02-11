import Handlebars from 'handlebars';
import { Block } from '../../services/Block';
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

export class RegistrationPage extends Block {
  private context: Context;

  constructor() {
    const initialContext: Context = {
      title: 'Регистрация',
      fields: [
        {
          label: 'Имя', type: 'text', name: 'first_name', placeholder: 'Имя',
        },
        {
          label: 'Фамилия', type: 'text', name: 'second_name', placeholder: 'Фамилия',
        },
        {
          label: 'Логин', type: 'text', name: 'login', placeholder: 'Логин',
        },
        {
          label: 'Почта', type: 'text', name: 'email', placeholder: 'Почта',
        },
        {
          label: 'Пароль', type: 'password', name: 'password', placeholder: 'Пароль',
        },
        {
          label: 'Телефон', type: 'tel', name: 'phone', placeholder: 'Телефон',
        },
      ],
      authButton: 'Зарегистрироваться',
      regButton: 'Войти',
      authButtonLink: '/src/pages/chat/chat.html',
      regButtonLink: '/src/pages/login/login.html',
    };

    super({}, new EventBus());

    this.context = initialContext;
    this.render();
    this.addEvents();
  }

  protected createElement(): HTMLElement {
    const div = document.createElement('div');
    div.innerHTML = Handlebars.compile(templateSource)(this.context);
    return div;
  }

  private render(): void {
    if (!this.element) return;
    this.element.innerHTML = Handlebars.compile(templateSource)(this.context);

    const renderInput = this.element.querySelector('#input-render');
    if (renderInput) {
      this.context.fields.forEach((field) => {
        const inputItem = new Input(field, new EventBus());
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

  protected addEvents(): void {
    if (!this.element) return;

    this.element.querySelectorAll<HTMLInputElement>('.input-wrapper input').forEach((input) => {
      input.addEventListener('blur', (e) => {
        const target = e.target as HTMLInputElement;
        const field = target.name;
        const { value } = target;
        const error = validateField(field, value);

        const errorElement = this.element.querySelector(`#${field}Error`);
        if (errorElement) {
          errorElement.textContent = error;
        }
      });
    });

    const form = this.element.querySelector('#registrationForm') as HTMLFormElement;
    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();

        let isValid = true;
        const formData: Record<string, string> = {};

        this.element.querySelectorAll<HTMLInputElement>('.input-wrapper input').forEach((input) => {
          const field = input.name;
          const { value } = input;
          const error = validateField(field, value);

          const errorElement = this.element.querySelector(`#${field}Error`);
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
          console.log('Регистрация успешна:', formData);
          window.location.href = this.context.authButtonLink;
        }
      });
    }
  }
}
