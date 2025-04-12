import { Block } from '../../services/Block';
import { ProfilePageLayout } from './profilePage';
import './styles.scss';
import { Sidebar } from '../../components/Sidebar';
import { Link } from '../../components/MainButton';
import { ProfileApi } from '../../api/profileApi';
import { EditProfileApi } from '../../api/EditProfileApi';
import { Button } from '../../components/LoginButton';
import { router } from '../../services/Router';

export class ProfilePage extends Block {
  private ProfileApi = new ProfileApi();

  private EditProfileApi = new EditProfileApi();

  constructor() {
    super({
      title: '',
      sidebar: new Sidebar(),
      profile: '',
      editProfile: new Button({
        class: 'button main__form_auth_btn',
        text: 'Сохранить данные',
        type: 'submit',
      }),
      changePassword: new Link({ text: 'Изменить пароль', href: '/edit-password' }),
      logout: new Link({
        text: 'Выйти',
        href: '/',
        modifier: 'exit',
        events: {
          click: (event: Event) => this.handleLogout(event),
        },
      }),
    });

    this.loadUserData();
  }

  async loadUserData() {
    try {
      const response = await this.ProfileApi.request();
      if (response.status === 200) {
        const userData = JSON.parse(response.response);

        const profileInfo = [
          { name: 'email', label: 'Почта', value: userData.email },
          { name: 'login', label: 'Логин', value: userData.login },
          { name: 'first_name', label: 'Имя', value: userData.first_name },
          { name: 'second_name', label: 'Фамилия', value: userData.second_name },
          { name: 'display_name', label: 'Имя в чате', value: userData.display_name },
          { name: 'phone', label: 'Телефон', value: userData.phone },
        ];

        const profileHtml = profileInfo.map((i) => `
            <div class="field-group">
              <p class="field-group__label">${i.label}</p>
              <input class="field-group__input" name="${i.name}" type="text" value="${i.value}" disabled />
              <button class="edit-field" data-name="${i.name}">✏️</button>
            </div>
          `).join('');

        this.setProps({
          title: userData.first_name,
          profile: profileHtml,
          profileImage: this.ProfileApi.getAvatarUrl(userData.avatar),
        });
      } else {
        console.error('Ошибка при загрузке данных профиля');
      }
    } catch (error) {
      console.error('Ошибка при запросе данных профиля:', error);
    }
  }

  handleSaveProfile(event: Event) {
    event.preventDefault();
    const inputs = document.querySelectorAll('.field-group__input');
    const updatedData: Record<string, string> = {};

    inputs.forEach((input) => {
      const inputElement = input as HTMLInputElement;
      updatedData[inputElement.name] = inputElement.value;
    });

    this.EditProfileApi.updateProfile(updatedData)
      .then((response) => {
        if (response.status === 200) {
          console.log('Профиль успешно обновлён!');
          this.loadUserData();
        } else {
          console.error('Ошибка при обновлении профиля');
        }
      })
      .catch((error) => {
        console.error('Ошибка запроса:', error);
      });
  }

  async handleLogout(event: Event) {
    event.preventDefault();
    try {
      const response = await this.ProfileApi.logOut();
      if (response.status === 200) {
        console.log('Выход выполнен успешно');
        router.go('/');
      } else {
        console.error('Ошибка при выходе из аккаунта');
      }
    } catch (error) {
      console.error('Ошибка при попытке выхода:', error);
    }
  }

  async handleAvatarUpload(event: Event) {
    const target = event.target as HTMLInputElement;
    if (!target.files || target.files.length === 0) return;

    const file = target.files[0];
    const formData = new FormData();
    formData.append('avatar', file);

    try {
      const response = await this.EditProfileApi.updateAvatar(formData);

      if (response.status === 200) {
        console.log('Аватар успешно обновлён!');

        const userResponse = await this.ProfileApi.request();
        if (userResponse.status === 200) {
          const userData = JSON.parse(userResponse.response);

          this.setProps({
            profileImage: this.ProfileApi.getAvatarUrl(userData.avatar),
          });
        }
      } else {
        console.error('Ошибка при загрузке аватара');
      }
    } catch (error) {
      console.error('Ошибка запроса:', error);
    }
  }

  override render() {
    setTimeout(() => {
      document.querySelectorAll('.edit-field').forEach((button) => {
        button.addEventListener('click', (event) => {
          const target = event.target as HTMLElement;
          const input = target.previousElementSibling as HTMLInputElement;
          input.removeAttribute('disabled');
          input.focus();
        });
      });

      document.querySelector('.avatar__input')
        ?.addEventListener('change', (event) => this.handleAvatarUpload(event));

      document.querySelector('.button.main__form_auth_btn')
        ?.addEventListener('click', (event) => this.handleSaveProfile(event));
    }, 0);

    return ProfilePageLayout;
  }
}
