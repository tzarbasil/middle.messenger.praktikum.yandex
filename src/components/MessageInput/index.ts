import { Button } from '../LoginButton';
import { Form } from '../MainForm';
import { Input } from '../MainInput';
import { Block } from '../../services/Block';
import { MessageInputLayout } from './messageInput';
import './styles.scss';

interface IMessageInputProps {
  name?: string;
  placeholder?: string;
  events?: {
    submit?: (event: Event) => void;
  };
}

export class MessageInput extends Block {
  constructor(props: IMessageInputProps = {}) {
    super({
      ...props,
      form: new Form({
        class: 'message-input__form',
        inputs: [
          new Input({
            type: 'text',
            name: 'message',
            class: 'message-input__text-input',
            placeholder: 'Сообщение',
          }),
        ],
        button: new Button({
          class: 'message-input__button',
          type: 'submit',
          text: '➔',
        }),
      }),
    });
  }

  override render() {
    return MessageInputLayout;
  }
}
