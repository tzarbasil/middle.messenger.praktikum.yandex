import { Block } from '../../services/Block';
import { addChatButton } from './template';
import './styles.scss';

interface addButtonInterface {
  text?: string;
  class?: string;
  type?: string;
  events?: {
    click?: (event: Event) => void;
  };
}

export class AddButton extends Block {
  constructor(props: addButtonInterface) {
    super({
      ...props,
    });
  }

  override render() {
    return addChatButton;
  }
}
