export const chatSettingsPopup = `
  <div id="chat-settings-popup" class="chat-popup hidden">
    <div class="chat-popup__overlay"></div>
    <div class="chat_settings_popup">
    <button class="chat-popup__close" aria-label="Закрыть попап">×</button>
      <h2 class="add_chat_form_title">Настройки чата</h2>
      <ul class="chat_user_list">
        <p>Список пользователей</p>
      </ul>
      {{{ form }}}
    </div>
  </div>
`;
