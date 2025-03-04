import Block from '../../services/Block';
import { UserMessageLayout } from './userMessage';

interface MessageInterface {
  text: string;
  time: string;
  isYours: boolean;
  isRead: boolean;
}

export class Message extends Block {
  constructor(props: MessageInterface) {
    super({ ...props });
  }

  override render() {
    return UserMessageLayout;
  }
}
