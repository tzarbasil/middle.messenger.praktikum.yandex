import Block from '../../services/Block';
import { ListElementLayout } from './template';

export class ListElement extends Block {
  override render() {
    return ListElementLayout;
  }
}
