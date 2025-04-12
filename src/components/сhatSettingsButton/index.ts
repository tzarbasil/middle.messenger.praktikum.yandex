import { Block } from '../../services/Block';
import { chatSettingButton } from './template';

  interface chatBtnInterface {
    text?: string;
    type: string,
    events?: {
      click?: (event: Event) => void;
    };
  }

export class ChatSetsButton extends Block {
  constructor(props: chatBtnInterface) {
    super({
      ...props,
    });
  }

  override render() {
    return chatSettingButton;
  }
}
