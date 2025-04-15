export const addChatPopup = `
  <div id="chat-popup" class="chat-popup hidden">
    <div class="chat-popup__overlay"></div>
    <div class="add_chat_popup">
      <button class="chat-popup__close" aria-label="Закрыть попап">×</button>
      <h2 class="add_chat_form_title">Создать чат</h2>
      {{{ form }}}
    </div>
  </div>
`;
