import { LinkLayout } from './mainButton';
import { Block } from '../../services/Block';
import { router } from '../../services/Router';

interface MainButtonInterface {
  modifier?: string;
  href: string;
  text: string;
  events?: {
    click?: (event: Event) => void;
  };
}

export class Link extends Block {
  constructor(props: MainButtonInterface) {
    super({
      ...props,
      events: {
        click: (event: Event) => {
          event.preventDefault();
          if (props.events?.click) {
            props.events.click(event);
          } else {
            router.go(props.href);
          }
        },
      },
    });
  }

  override render() {
    return LinkLayout;
  }
}
