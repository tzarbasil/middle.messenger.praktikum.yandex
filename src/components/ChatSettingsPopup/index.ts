import { Form } from '../MainForm';
import { Block } from '../../services/Block';
import { chatSettingsPopup } from './template';
import { Button } from '../LoginButton';
import { Input } from '../MainInput';
import './styles.scss';
import { ChatApi } from '../../api/chatApi';

const modalInput = [
  {
    name: 'title', label: 'Добавить пользователя по id', type: 'text', required: true,
  },
];

export class ChatSettingsPopup extends Block {
  private chatApi = new ChatApi();

  public chatId: number;

  constructor(chatId: number) {
    super({
      form: new Form({
        class: 'chat-settings-form',
        inputs: modalInput.map((i) => new Input({ ...i, class: 'input_container' })),
        button: new Button({
          class: 'button main__form_auth_btn add_user_btn',
          text: 'Добавить пользователя',
          type: 'submit',
        }),
      }),
      events: {
        submit: (event: Event) => this.handleAddUser(event),
      },
    });
    this.chatId = chatId;
    this.eventBus().on(Block.EVENTS.FLOW_RENDER, () => {
      this.updateUserList();
    });
  }

  async handleAddUser(event: Event) {
    event.preventDefault();
    const form = this.element?.querySelector('form');
    if (!form) return;

    const formData = new FormData(form);
    const userId = Number(formData.get('title'));

    try {
      const response = await this.chatApi.addUsers(this.chatId, userId);
      if (response.status === 200) {
        console.log('Пользователь добавлен');
        this.updateUserList();
      } else {
        console.error('Ошибка при добавлении пользователя', response.responseText);
      }
    } catch (error) {
      console.error('Ошибка при добавлении пользователя:', error);
    }
  }

  async updateUserList() {
    try {
      const response = await this.chatApi.getUsers(String(this.chatId));
      if (response.status === 200) {
        const users = JSON.parse(response.responseText);
        const userList = this.element?.querySelector('.chat_user_list');
        if (userList) {
          const userItems = users.map((user: any) => `
              <li>
                ${user.first_name} ${user.second_name}
                <button class="delete-user-btn" data-user-id="${user.id}">
                ❌ Удалить
                </button>
              </li>
            `).join('');
          userList.innerHTML = `<p>Список пользователей</p>${userItems}`;
        }
        this.addDeleteUserEvent();
      }
    } catch (error) {
      console.error('Ошибка получения пользователей:', error);
    }
  }

  addDeleteUserEvent() {
    const deleteButtons = this.element?.querySelectorAll('.delete-user-btn');
    deleteButtons?.forEach((button) => {
      button.addEventListener('click', (event) => {
        const userId = (event.target as HTMLElement).closest('.delete-user-btn')?.getAttribute('data-user-id');
        if (userId) {
          this.handleDeleteUser(Number(userId));
        }
      });
    });
  }

  async handleDeleteUser(userId: number) {
    try {
      const response = await this.chatApi.deleteUsers(this.chatId, userId);
      if (response.status === 200) {
        console.log(`Пользователь с ID ${userId} был удалён`);
        this.updateUserList();
      } else {
        console.error('Ошибка при удалении пользователя', response.responseText);
      }
    } catch (error) {
      console.error('Ошибка при удалении пользователя:', error);
    }
  }

  override render() {
    return chatSettingsPopup;
  }
}
