import { DeleteChatBtnLayout } from './template';
import { Block } from '../../services/Block';
import './styles.scss';

interface DeleteChatBtnInterface {
  text: string;
  events?: {
    click?: (event: Event) => void;
  };
}

export class DeleteChatButton extends Block {
  constructor(props: DeleteChatBtnInterface) {
    super({
      ...props,
    });
  }

  override render() {
    return DeleteChatBtnLayout;
  }
}
