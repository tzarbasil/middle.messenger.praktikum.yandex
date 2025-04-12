import { Button } from '../../components/LoginButton';
import { Form } from '../../components/MainForm';
import { Input } from '../../components/MainInput';
import { Sidebar } from '../../components/Sidebar';
import { Block } from '../../services/Block';
import './styles.scss';

import { PasswordPageLayout } from './passwordPage';
import { EditProfileApi } from '../../api/EditProfileApi';

const changePasswordFields = [
  {
    name: 'oldPassword',
    label: 'Старый пароль',
    type: 'password',
    required: true,
    value: '',
  },
  {
    name: 'newPassword',
    label: 'Новый пароль',
    type: 'password',
    required: true,
    value: '',
  },
  {
    name: 'repeatNewPassword',
    label: 'Повторите новый пароль',
    type: 'password',
    required: true,
    value: '',
  },
];

export class PasswordPage extends Block {
  private EditProfileApi: EditProfileApi;

  constructor() {
    const form = new Form({
      class: 'profile-form',
      inputs: changePasswordFields.map(
        (i) => new Input({ ...i, class: 'input_container' }),
      ),
      button: new Button({
        text: 'Сохранить',
        type: 'submit',
        class: 'main__form_auth_btn',
      }),
    });

    super({
      title: 'Иван',
      sidebar: new Sidebar(),
      form,
      events: {
        submit: (event: Event) => this.handlePasswordChange(event),
      },
    });

    this.EditProfileApi = new EditProfileApi();
  }

  async handlePasswordChange(event: Event) {
    event.preventDefault();

    const form = this.element?.querySelector('form');
    if (!form) return;

    const formData = new FormData(form);
    const data: Record<string, string> = {};
    formData.forEach((value, key) => {
      data[key] = value as string;
    });

    const { oldPassword, newPassword, repeatNewPassword } = data;

    if (newPassword !== repeatNewPassword) {
      return;
    }

    try {
      const response = await this.EditProfileApi.updatePassword({ oldPassword, newPassword });

      if (response.status === 200) {
        form.reset();
      }
    } catch (error) {
      console.error('Ошибка при смене пароля:', error);
    }
  }

  override render() {
    return PasswordPageLayout;
  }
}
