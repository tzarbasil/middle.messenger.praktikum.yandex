import { Button } from '../LoginButton';
import { Form } from '../MainForm';
import { Input } from '../MainInput';
import { Block } from '../../services/Block';
import { MessageInputLayout } from './messageInput';

interface IMessageInputProps {
  name?: string;
  placeholder?: string;
}

export class MessageInput extends Block {
  constructor(props: IMessageInputProps = {}) {
    super({
      ...props,
      form: new Form({
        class: 'message-input__form',
        inputs: [
          new Input({
            type: 'file',
            name: 'file',
            class: 'message-input__file-input',
          }),
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
        }),
      }),
    });
  }

  override render() {
    return MessageInputLayout;
  }
}
