import Handlebars from 'handlebars';
import { EventBus } from '../../services/EventBus';
import { Input, InputEventBus } from '../../services/Input';

interface Context {
	title: string;
	fields: InputEventBus[];
	firstName: string;
}

const context: Context = {
  title: 'Вход',
  fields: [
    {
      label: 'Почта', type: 'text', name: 'email', placeholder: 'pochta@yandex.ru',
    },
    {
      label: 'Логин',
      type: 'text',
      name: 'login',
      placeholder: 'ivanivanov',
    },
    {
      label: 'Имя',
      type: 'text',
      name: 'first_name',
      placeholder: 'Иван',
    },
    {
      label: 'Фамилия',
      type: 'text',
      name: 'second_name',
      placeholder: 'Иванов',
    },
    {
      label: 'Имя в чате',
      type: 'text',
      name: 'display_name',
      placeholder: 'Иван',
    },
    {
      label: 'Телефон',
      type: 'text',
      name: 'phone',
      placeholder: '+7 (909) 967 30 30',
    },
  ],
  firstName: 'Иван',
};

const templateSource = `
<main><div class="profile__page">
    <div class="sidebar">
        <a href="/src/pages/chat/chat.html" class="sidebar_link">⭠</a>
</div>

<div class="profile__page_container">
    <input class="avatar" type="file" name="avatar" accept="image/png, image/jpeg">
    <h1 class="name">{{firstName}}</h1>

    <form class="form">
        <div class="input_container">
        <div class="main__form_inputs" id="input-render"></div>

        </div>
            <div class="btn_container">
                <a href="#">Изменить данные</a>
                <a href="#">Изменить пароль</a>
                <a href="#" class="exit">Выйти</a>
            </div>
    </form>
</div>
</div>
</main>
`;

const profileElement = document.getElementById('profile');
const eventBus = new EventBus();

const template = Handlebars.compile(templateSource);
const html = template(context);

if (profileElement) {
  profileElement.innerHTML = html;

  const renderInput = document.getElementById('input-render');

  if (renderInput) {
    context.fields.forEach((field) => {
      const inputItem = new Input(field, eventBus);
      renderInput.appendChild(inputItem.getElement());
    });
  }
}
