import Block from '../../services/Block';
import { MessangerLayout } from './messanger';

export class Messanger extends Block {
  override render() {
    return MessangerLayout;
  }
}
