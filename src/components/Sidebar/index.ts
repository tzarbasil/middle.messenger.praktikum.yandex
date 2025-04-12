import { Button } from '../LoginButton';
import { SidebarLayout } from './sidebar';
import { Block } from '../../services/Block';
import './styles.scss';

export class Sidebar extends Block {
  constructor() {
    super({
      button: new Button({
        type: 'button',
        class: 'sidebar_link',
        text: '⭠',
      }),
    });
  }

  override render() {
    return SidebarLayout;
  }
}
