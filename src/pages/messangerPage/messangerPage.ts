export const MessangerPageLayout = `
<div class="messenger_page">
  <div class="sidebar">
    {{{ MessangerHeader }}}
    <ul class="sidebar__chats">
      {{{ chatList }}}
    </ul>
  </div>

  <div class="chats">
    {{#if hidePlaceholder}}
      <!-- ничего не выводим -->
    {{else}}
      <p class="messanger__placeholder">Выберите чат чтобы отправить сообщение</p>
    {{/if}}
  </div>

  {{#if selectedChatId}}
    <div class="selected-chat">
      <div class="selected-chat__header">
        <div class="selected-chat__user">
          <div class="messanger__list_item_avatar messanger__list_item_avatar_selected"></div>
          <h1 class="selected-chat__title">{{chatName}}</h1>
        </div>
        <div class="selected-chat__settings">{{{ chatSetBtn }}}</div>
      </div>

      <div class="selected-chat__messages">
        <div class="chat-start-date">{{chatStartDate}}</div>
        {{{ messageList }}}
      </div>

      <div class="selected-chat__input">
        {{{ messageInput }}}
      </div>
    </div>
  {{/if}}

  {{{ chatPopup }}}
  {{#if chatSettingsPopup}}
  {{{ chatSettingsPopup }}}
{{/if}}
</div>
;
`;
