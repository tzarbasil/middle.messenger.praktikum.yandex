import { Button } from '../../components/LoginButton';
import { Form } from '../../components/MainForm';
import { Input } from '../../components/MainInput';
import { Sidebar } from '../../components/Sidebar';
import Block from '../../services/Block';
import { ProfileEditPageLayout } from './profileEditPage';

const editProfileData = [
  {
    name: 'email',
    label: 'Почта',
    type: 'email',
    required: true,
    value: 'pochta@yandex.ru',
    placeholder: 'Почта',
  },
  {
    name: 'login',
    label: 'Логин',
    type: 'text',
    required: true,
    value: 'ivanivanov',
    placeholder: 'Логин',
  },
  {
    name: 'first_name',
    label: 'Имя',
    type: 'text',
    required: true,
    value: 'Иван',
    placeholder: 'Имя',
  },
  {
    name: 'second_name',
    label: 'Фамилия',
    type: 'text',
    required: true,
    value: 'Иванов',
    placeholder: 'Фамилия',
  },
  {
    name: 'display_name',
    label: 'Имя в чате',
    type: 'text',
    required: true,
    value: 'Иван',
    placeholder: 'Имя в чате',
  },
  {
    name: 'phone',
    label: 'Телефон',
    type: 'text',
    required: true,
    value: '+7 (909) 967 30 30',
    placeholder: 'Телефон',
  },
];

export class ProfileEditPage extends Block {
  constructor() {
    super({
      title: 'Иван',
      sidebar: new Sidebar(),
      form: new Form({
        class: 'profile-form',
        inputs: editProfileData.map(
          (i) => new Input({ ...i, class: 'input_container' }),
        ),
        button: new Button({
          text: 'Сохранить',
          type: 'submit',
          class: 'main__form_auth_btn',
        }),
      }),
    });
  }

  override render() {
    return ProfileEditPageLayout;
  }
}
