import { Block } from '../../services/Block';
import { SearchForm } from './searchForm';
import { Input } from '../MainInput';
import './styles.scss';

export class SearchInput extends Block {
  constructor() {
    super({
      input: new Input({
        class: 'label_for_search',
        type: 'search',
        name: 'search',
        label: 'Поиск',
      }),
    });
  }

  override render() {
    return SearchForm;
  }
}
