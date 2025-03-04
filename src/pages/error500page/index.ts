import { Error } from '../../components/ErrorComponent';
import { Link } from '../../components/MainButton';
import { Block } from '../../services/Block';
import { Error505Layout } from './error500page';

export class Error505 extends Block {
  constructor() {
    super({
      error: new Error({
        title: '500',
        subtitle: 'Мы уже фиксим',
        link: new Link({ text: 'Назад к чатам', href: '/messanger' }),
      }),
    });
  }

  override render() {
    return Error505Layout;
  }
}
