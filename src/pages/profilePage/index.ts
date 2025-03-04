import { Block } from '../../services/Block';
import { ProfilePageLayout } from './profilePage';
import './styles.scss';
import { ProfileData } from '../../components/ProfileDataForm';
import { Sidebar } from '../../components/Sidebar';
import { Link } from '../../components/MainButton';

const profileInfo = [
  { name: 'email', label: 'Почта', value: 'pochta@yandex.ru' },
  { name: 'login', label: 'Логин', value: 'ivanivanov' },
  { name: 'first_name', label: 'Имя', value: 'Иван' },
  { name: 'second_name', label: 'Фамилия', value: 'Иванов' },
  { name: 'display_name', label: 'Имя в чате', value: 'Иван' },
  { name: 'phone', label: 'Телефон', value: '+79099673030' },
];

export class ProfilePage extends Block {
  constructor() {
    super({
      title: 'Иван',
      sidebar: new Sidebar(),
      profile: profileInfo.map((i) => new ProfileData({ ...i })),
      editProfile: new Link({ text: 'Изменить данные', href: '/edit-profile' }),
      changePassword: new Link({
        text: 'Изменить пароль',
        href: '/change-password',
      }),
      logout: new Link({ text: 'Выйти', href: '/', modifier: 'exit' }),
    });
  }

  override render() {
    return ProfilePageLayout;
  }
}
