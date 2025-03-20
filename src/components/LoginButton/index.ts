import { Block } from '../../services/Block';
import { loginButton } from './loginButton';
import './styles.scss';

interface loginButtonInterface {
  text?: string;
  class?: string;
  type?: string;
}

export class Button extends Block {
  constructor(props: loginButtonInterface) {
    super({
      ...props,
    });
  }

  override render() {
    return loginButton;
  }
}
