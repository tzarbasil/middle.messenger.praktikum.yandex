import { Link } from '../MainButton';
import { Block } from '../../services/Block';
import { MessangerHeaderLayout } from './messangerHeader';
import { AddButton } from '../AddChatBtn';
import './styles.scss';

export class MessangerHeader extends Block {
  constructor() {
    super({
      link: new Link({ text: 'Профиль', href: '/settings' }),
      button: new AddButton({
        class: 'add-chat-button',
        text: '+',
        type: 'button',
        events: {
          click: () => {
            const popup = document.getElementById('chat-popup');
            if (popup) {
              popup.classList.remove('hidden');
            }
          },
        },
      }),
    });
  }

  override render() {
    return MessangerHeaderLayout;
  }
}
