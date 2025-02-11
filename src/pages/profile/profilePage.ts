import Handlebars from 'handlebars';
import { Block } from '../../services/Block';
import { EventBus } from '../../services/EventBus';
import { Input, InputEventBus } from '../../services/Input';
import { validateField } from '../../services/validation';

interface Context {
  isEditing: boolean;
  isChangingPassword: boolean;
  fields: InputEventBus[];
}

const templateSource = `
<main class="profile__page">
  <div class="sidebar">
    <a href="/src/pages/chat/chat.html" class="sidebar_link">⭠</a>
  </div>
  <div class="profile__page_container">
    <input class="avatar" type="file" name="avatar" accept="image/png, image/jpeg">

    {{#if isChangingPassword}}
      <h1 class="name">Изменить пароль</h1>
      <form class="form" id="changePasswordForm">
        <div class="input_container">
          <div class="main__form_inputs" id="password-inputs"></div>
        </div>
        <div class="btn_container">
          <button type="submit" class="main__form_auth_btn" id="savePassword">Сохранить</button>
        </div>
      </form>
    {{else}}
      <h1 class="name">Иван</h1>
      <form class="form" id="profileForm">
        <div class="input_container">
          <div class="main__form_inputs" id="input-render"></div>
        </div>
        <div class="btn_container">
          {{#if isEditing}}
            <button type="submit" class="main__form_auth_btn" id="saveProfile">Сохранить</button>
          {{else}}
            <a href="#" id="editProfile">Изменить данные</a>
          {{/if}}
          <a href="#" id="changePassword">Изменить пароль</a>
          <a href="#" class="exit" id="logout">Выйти</a>
        </div>
      </form>
    {{/if}}
  </div>
</main>
`;

export class ProfilePage extends Block {
  private context: Context = {
    isEditing: false,
    isChangingPassword: false,
    fields: [
      {
        label: 'Почта', type: 'text', name: 'email', placeholder: 'pochta@yandex.ru', disabled: true,
      },
      {
        label: 'Логин', type: 'text', name: 'login', placeholder: 'ivanivanov', disabled: true,
      },
      {
        label: 'Имя', type: 'text', name: 'first_name', placeholder: 'Иван', disabled: true,
      },
      {
        label: 'Фамилия', type: 'text', name: 'second_name', placeholder: 'Иванов', disabled: true,
      },
      {
        label: 'Имя в чате', type: 'text', name: 'display_name', placeholder: 'Иван', disabled: true,
      },
      {
        label: 'Телефон', type: 'tel', name: 'phone', placeholder: '+7 (909) 967 30 30', disabled: true,
      },
    ],
  };

  private passwordFields = [
    {
      label: 'Старый пароль', type: 'password', name: 'old_password', placeholder: '••••••••',
    },
    {
      label: 'Новый пароль', type: 'password', name: 'new_password', placeholder: '••••••••',
    },
    {
      label: 'Повторите новый пароль', type: 'password', name: 'repeat_password', placeholder: '••••••••',
    },
  ];

  protected createElement(): HTMLElement {
    const div = document.createElement('div');
    div.innerHTML = Handlebars.compile(templateSource)(this.context);
    return div.firstElementChild as HTMLElement;
  }

  constructor() {
    super({}, new EventBus());
    this.render();
  }

  private render(): void {
    const newElement = this.createElement();
    if (this.element && this.element.parentNode) {
      this.element.parentNode.replaceChild(newElement, this.element);
    }
    this.element = newElement;

    if (this.context.isChangingPassword) {
      this.renderPasswordInputs();
    } else {
      this.renderProfileInputs();
    }
    this.addEvents();
  }

  private renderProfileInputs(): void {
    const renderInput = this.element?.querySelector('#input-render');
    if (!renderInput) return;

    renderInput.innerHTML = '';
    this.context.fields.forEach((field) => {
      const inputItem = new Input({ ...field, disabled: !this.context.isEditing }, new EventBus());
      renderInput.appendChild(inputItem.getElement());
    });
  }

  private renderPasswordInputs(): void {
    const renderInput = this.element?.querySelector('#password-inputs');
    if (!renderInput) return;

    renderInput.innerHTML = '';
    this.passwordFields.forEach((field) => {
      const inputItem = new Input(field, new EventBus());
      renderInput.appendChild(inputItem.getElement());
    });
  }

  protected addEvents(): void {
    if (!this.element) return;

    const inputs = this.element.querySelectorAll('input');
    inputs.forEach((input) => {
      input.addEventListener('blur', (e) => {
        const target = e.target as HTMLInputElement;
        const error = validateField(target.name, target.value);
        if (error) {
          console.error(error);
        }
      });
    });

    const profileForm = this.element.querySelector('#profileForm') as HTMLFormElement | null;
    const passwordForm = this.element.querySelector('#changePasswordForm') as HTMLFormElement | null;

    if (profileForm) {
      profileForm.addEventListener('submit', (e) => {
        e.preventDefault();
        this.handleSubmit(profileForm);
      });
    }

    if (passwordForm) {
      passwordForm.addEventListener('submit', (e) => {
        e.preventDefault();
        this.handleSubmit(passwordForm);
      });
    }
  }

  private handleSubmit(form: HTMLFormElement): void {
    const formData = new FormData(form);
    const values: Record<string, string> = {};
    let isValid = true;

    formData.forEach((value, key) => {
      const error = validateField(key, value as string);
      if (error) {
        console.error(error);
        isValid = false;
      }
      values[key] = value as string;
    });

    if (isValid) {
      console.log('Форма успешно отправлена:', values);
    }
  }
}
