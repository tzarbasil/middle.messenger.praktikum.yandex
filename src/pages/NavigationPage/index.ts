import { ListElement } from '../../components/ListElement';
import { Link } from '../../components/MainButton';
import { linksOnNavigationPage } from './navigationLinks';
import { Block } from '../../services/Block';
import { NavigationPageLayout } from './navigationPage';

export class NavigationPage extends Block {
  constructor() {
    super({
      links: linksOnNavigationPage.map(
        (i) => new ListElement({
          ...i,
          class: 'nav__item',
          children: new Link({ ...i }),
        }),
      ),
    });
  }

  override render() {
    return NavigationPageLayout;
  }
}
