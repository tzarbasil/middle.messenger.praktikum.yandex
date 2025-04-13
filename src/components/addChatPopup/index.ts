import { Form } from '../MainForm';
import { Block } from '../../services/Block';
import { addChatPopup } from './addChatPopup';

import { Button } from '../LoginButton';
import { Input } from '../MainInput';
import './styles.scss';
import { ChatApi } from '../../api/chatApi';
import { router } from '../../services/Router';

const modalInput = [
  {
    name: 'title', label: 'Название чата', type: 'text', required: true,
  },
];

export class ChatPopup extends Block {
  private chatApi = new ChatApi();

  constructor() {
    super({
      form: new Form({
        class: 'chat-form',
        inputs: modalInput.map((i) => new Input({ ...i, class: 'input_container' })),
        button: new Button({
          class: 'button main__form_auth_btn',
          text: 'Создать чат',
          type: 'submit',
        }),
      }),
      events: {
        submit: (event: Event) => this.handleCreateChat(event),
        click: (event: Event) => this.handlePopupClick(event),
      },
    });
  }

  async handleCreateChat(event: Event) {
    event.preventDefault();
    const form = this.element?.querySelector('form');
    if (!form) return;

    const formData = new FormData(form);
    const data: Record<string, string> = {};
    formData.forEach((value, key) => {
      data[key] = value as string;
    });

    try {
      const response = await this.chatApi.createChat(data);
      if (response.status === 200) {
        console.log('Чат создан успешно');
        router.go('/messenger');
      } else {
        console.error('Ошибка создания чата', response.responseText);
      }
    } catch (error) {
      console.error('Ошибка при создании чата:', error);
    }
  }

  handlePopupClick(event: Event) {
    const target = event.target as HTMLElement;
    if (target.classList.contains('chat-popup__close') || target.classList.contains('chat-popup__overlay')) {
      this.hide();
    }
  }

  hide() {
    const popup = this.element;
    popup?.classList.add('hidden');
  }


  override render() {
    return addChatPopup;
  }
}
