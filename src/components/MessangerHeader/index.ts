import { Link } from '../MainButton';
import Block from '../../services/Block';
import { MessangerHeaderLayout } from './messangerHeader';
import { SearchInput } from '../searchForm';
import './styles.scss';

export class MessangerHeader extends Block {
  constructor() {
    super({
      link: new Link({ text: 'Профиль', href: '/profile' }),
      search: new SearchInput(),
    });
  }

  override render() {
    return MessangerHeaderLayout;
  }
}
