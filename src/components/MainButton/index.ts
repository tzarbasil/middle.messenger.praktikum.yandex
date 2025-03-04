import { LinkLayout } from './mainButton';
import Block from '../../services/Block';

interface MainButtonInterface {
  modifier?: string;
  href: string;
  text: string;
}

export class Link extends Block {
  constructor(props: MainButtonInterface) {
    super({
      ...props,
    });
  }

  override render() {
    return LinkLayout;
  }
}
