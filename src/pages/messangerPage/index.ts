import { Block } from '../../services/Block';
import { MessangerPageLayout } from './messangerPage';
import { ListElement } from '../../components/ListElement';
import './styles.scss';
import { chatList } from '../../messanger_data/messangerData';
import { MessangerHeader } from '../../components/MessangerHeader';
import { Messanger } from '../../components/Messanger';

export class MessangerPage extends Block {
  constructor() {
    super({
      title: 'Список чатов',
      MessangerHeader: new MessangerHeader(),
      chatList: chatList.map(
        (i) => new ListElement({
          ...i,
          class: 'sidebar__chat',
          children: new Messanger({ ...i }),
        }),
      ),
    });
  }

  override render() {
    return MessangerPageLayout;
  }
}
