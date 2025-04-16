import { Block } from '../../services/Block';
import { MessangerPageLayout } from './messangerPage';
import { ListElement } from '../../components/ListElement';
import './styles.scss';
import { MessangerHeader } from '../../components/MessangerHeader';
import { Messanger } from '../../components/Messanger';
import { ChatApi } from '../../api/chatApi';
import { ChatPopup } from '../../components/addChatPopup';
import { MessageInput } from '../../components/MessageInput';
import { Message } from '../../components/UserMessage';
import { MessageSocket } from '../../services/WSTransport';
import { ProfileApi } from '../../api/profileApi';
import { ChatSetsButton } from '../../components/сhatSettingsButton';
import { ChatSettingsPopup } from '../../components/ChatSettingsPopup';

export class MessangerPage extends Block {
  private chatApi = new ChatApi();

  private ProfileApi = new ProfileApi();

  private socket: MessageSocket | null = null;

  private userId: number | null = null;

  private chatSettingsPopup: ChatSettingsPopup;

  constructor() {
    const initialPopup = new ChatSettingsPopup(0);

    super({
      title: 'Список чатов',
      MessangerHeader: new MessangerHeader(),
      chatPopup: new ChatPopup(),
      chatSettingsPopup: initialPopup,
      chatSetBtn: new ChatSetsButton({
        type: 'button',
        text: '...',
        events: {
          click: () => {
            const chatSetPopup = document.getElementById('chat-settings-popup');
            if (chatSetPopup) {
              chatSetPopup.classList.remove('hidden');
            }
          },
        },
      }),
      chatName: '',
      chatStartDate: '',
      hidePlaceholder: false,
      messageInput: new MessageInput({
        name: 'message',
        placeholder: 'Сообщение',
        events: {
          submit: (event: Event) => this.handleMessageSubmit(event),
        },
      }),
    });

    this.chatSettingsPopup = initialPopup;
    this.lists.chatList = [];
    this.lists.messageList = [];
    this.loadUserAndChats();
  }

  async loadUserAndChats() {
    try {
      const userRes = await this.ProfileApi.request();
      if (userRes.status === 200) {
        const user = JSON.parse(userRes.response);
        this.userId = user.id;

        this.loadChatData();
      } else {
        console.error('Ошибка получения пользователя');
      }
    } catch (e) {
      console.error('Ошибка загрузки userId:', e);
    }
  }

  async loadChatData() {
    try {
      const response = await this.chatApi.request();
      if (response.status === 200) {
        const chatData = JSON.parse(response.response);
        const chatComponents = chatData.map((chat: any) => {
          const lastMessage = chat.last_message?.content || 'Нет сообщений';
          const lastTime = chat.last_message?.time
            ? new Date(chat.last_message.time).toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit',
            })
            : '';

          return new ListElement({
            class: 'sidebar__chat',
            children: new Messanger({
              href: `/messenger-chat/${chat.id}`,
              user: chat.title,
              message: lastMessage,
              time: lastTime,
              events: {
                click: () => this.selectChat(chat),
              },
            }),
          });
        });

        this.lists.chatList = chatComponents;
        this.eventBus().emit(Block.EVENTS.FLOW_CDU);
      }
    } catch (error) {
      console.error('Ошибка при загрузке чатов', error);
    }
  }

  selectChat(chat: any) {
    if (!this.userId) {
      console.error('Нет userId — не могу подключиться к сокету');
      return;
    }

    if (this.socket) {
      this.socket.close();
    }

    this.socket = new MessageSocket(chat.id, this.userId);

    this.socket.subscribe('messages:batch', (messages) => {
      const formatted = messages.reverse().map((chatmsg: any) => new Message({
        content: chatmsg.content,
        time: new Date(chatmsg.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isYours: chatmsg.user_id === this.userId,
        isRead: true,
      }));
      this.chatSettingsPopup.chatId = chat.id;
      this.chatSettingsPopup.updateUserList();
      this.lists.messageList = formatted;
      this.setProps({
        selectedChatId: chat.id,
        chatName: chat.title,
        chatStartDate: new Date().toLocaleDateString(),
        chatSettingsPopup: this.chatSettingsPopup,
        hidePlaceholder: true,
      });
    });

    this.socket.subscribe('messages:new', (chatmsg) => {
      const newMessage = new Message({
        content: chatmsg.content,
        time: new Date(chatmsg.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isYours: chatmsg.user_id === this.userId,
        isRead: true,
      });
      this.lists.messageList = [...(this.lists.messageList || []), newMessage];
    });

    this.socket.subscribe('messages:new', (chatmsg) => {
      const newMessage = new Message({
        content: chatmsg.content,
        time: new Date(chatmsg.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isYours: chatmsg.user_id === this.userId,
        isRead: true,
      });
      this.lists.messageList = [...(this.lists.messageList || []), newMessage];
    });
  }

  handleMessageSubmit(event: Event) {
    event.preventDefault();

    const messageInput = event.target as HTMLFormElement;
    const inputElement = messageInput.querySelector('input[name="message"]') as HTMLInputElement;

    const messageText = inputElement?.value;

    if (messageText && this.socket) {
      const message = {
        content: messageText,
        type: 'message',
      };
      this.socket.send(message);

      const newMessage = new Message({
        content: messageText,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isYours: true,
        isRead: true,
      });

      const currentList = this.props.messageList as Message[];
      this.setProps({ messageList: [...(currentList || []), newMessage] });
      inputElement.value = '';
    }
  }

  override render() {
    return MessangerPageLayout;
  }
}
