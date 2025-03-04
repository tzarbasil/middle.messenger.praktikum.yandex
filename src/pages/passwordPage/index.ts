import { Button } from '../../components/LoginButton';
import { Form } from '../../components/MainForm';
import { Input } from '../../components/MainInput';
import { Sidebar } from '../../components/Sidebar';
import Block from '../../services/Block';
import './styles.scss';

import { PasswordPageLayout } from './passwordPage';

const changePasswordFields = [
  {
    name: 'oldPassword',
    label: 'Старый пароль',
    type: 'password',
    required: true,
    value: '123qwe',
  },
  {
    name: 'newPassword',
    label: 'Новый пароль',
    type: 'password',
    required: true,
    value: '123qwe',
  },
  {
    name: 'repeatNewPassword',
    label: 'Повторите новый пароль',
    type: 'password',
    required: true,
    value: '123qwe',
  },
];
export class PasswordPage extends Block {
  constructor() {
    super({
      title: 'Иван',
      sidebar: new Sidebar(),
      form: new Form({
        class: 'profile-form',
        inputs: changePasswordFields.map(
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
    return PasswordPageLayout;
  }
}
