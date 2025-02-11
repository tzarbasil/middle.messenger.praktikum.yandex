import Handlebars from 'handlebars';
import { Block } from '../../services/Block';
import { EventBus } from '../../services/EventBus';

interface Context {
  profileButton: string;
  profileButtonLink: string;
}

const templateSource = `
 <main class="messanger_page">
  <div class="messanger__container">
    <div class="messanger__list_container">
      <a href="{{profileButtonLink}}" class="profile_link">{{profileButton}}</a>
      <label>
        <input type="text" placeholder="Поиск" />
      </label>

      <div class="messanger__list">
        <div class="messanger__list_item">
          <img class="messanger__list_item_avatar" src="" alt="user_avatar" />
          <div class="messanger__list_item_name_container">
            <p class="messanger__list_item_name">Андрей</p>
            <p class="messanger__list_item_message">
              Друзья, у меня для вас особенный выпуск новостей!...
            </p>
          </div>
          <div class="messanger__list_item_info">
            <p class="messanger__list_item_time">10:49</p>
            <p class="messanger__list_item_counter">2</p>
          </div>
        </div>
      </div>
    </div>

    <div class="messanger_chat">
      <section class="messanger_chat_item">
        <header class="messanger_chat_header">
          <img class="messanger__list_item_avatar" src="" alt="user_avatar" />
          <p class="messanger__list_item_name">Вадим</p>
        </header>
        <div class="messanger_chat_item_container">
          <p class="messanger_chat_item_date">19 июня</p>
          <div class="companion_message">
            Привет! Смотри, тут всплыл интересный кусок лунной космической
            истории...
            <p class="companion_message_date">11:56</p>
          </div>

          <div class="messanger_chat_item_image_container">
            <img
              src="../../assets/images/message_image.png"
              alt="message_image"
              class="messanger_chat_item_image"
            />
            <p class="messanger_chat_item_image_date">11:56</p>
          </div>

          <p class="user_message">Круто!</p>
        </div>
        <footer class="messanger_chat_footer">
          <form>
            <input class="messanger_chat_footer_file" type="file" id="file" />
            <label class="messanger_chat_footer_message">
              <input type="text" placeholder="Сообщение" name="message" />
            </label>
          </form>
          <button class="send_btn">→</button>
        </footer>
      </section>
    </div>
  </div>
</main>
`;

export class ChatPage extends Block {
  private context: Context = {
    profileButton: 'Профиль',
    profileButtonLink: '/src/pages/profile/profile.html',
  };

  protected createElement(): HTMLElement {
    const div = document.createElement('div');
    div.innerHTML = Handlebars.compile(templateSource)(this.context);
    return div;
  }

  constructor() {
    super({}, new EventBus());
  }
}
