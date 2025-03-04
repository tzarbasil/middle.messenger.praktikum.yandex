import { Error } from '../../components/ErrorComponent';
import { Link } from '../../components/MainButton';
import { Block } from '../../services/Block';
import { Error404Layout } from './error404page';

export class Error404 extends Block {
  constructor() {
    super({
      error: new Error({
        title: '404',
        subtitle: 'Не туда попали',
        link: new Link({ text: 'Назад к чатам', href: '/messanger' }),
      }),
    });
  }

  override render() {
    return Error404Layout;
  }
}
