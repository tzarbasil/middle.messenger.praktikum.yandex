import { MessageInput } from '../../components/MessageInput';
import { Block } from '../../services/Block';
import { ListElement } from '../../components/ListElement';
import { chatList, messageList } from '../../messanger_data/messangerData';
import { MessangerHeader } from '../../components/MessangerHeader';
import { Messanger } from '../../components/Messanger';
import { Message } from '../../components/UserMessage';
import { MessangerPageMessangerLayout } from './messangerPageChat';
import './style.scss';

export class MessangerPageChat extends Block {
  constructor() {
    super({
      title: 'Андрей',
      messangertartDate: '19 июня',
      MessangerHeader: new MessangerHeader(),
      chatList: chatList.map(
        (i) => new ListElement({
          ...i,
          class: 'sidebar__chat',
          children: new Messanger({ ...i }),
        }),
      ),
      messageList: messageList.map((i) => new Message({ ...i })),
      messageInput: new MessageInput({
        name: 'message',
        placeholder: 'Сообщение',
      }),
    });
  }

  override render() {
    return MessangerPageMessangerLayout;
  }
}
