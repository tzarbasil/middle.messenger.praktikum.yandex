export const MessangerPageMessangerLayout = `
  <div class="messanger_chat">
    <div class="sidebar">
      {{{ MessangerHeader }}}
      <ul class="sidebar__chats">
       {{{ chatList }}}
      </ul>
    </div>
    <div class="selected-chat">
      <div class="selected-chat__header">
        <div class="selected-chat__user">
          <div class="messanger__list_item_avatar messanger__list_item_avatar_selected"></div>

          <h1 class="selected-chat__title">{{title}}</h1>
        </div>
        <div class="selected-chat__settings">
          <button class="selected-chat__settings_button">•••</button>
        </div>
      </div>
      <div class="selected-chat__messages">
      <div class="chat-start-date">{{chatStartDate}}</div>
      {{{ messageData }}}
      {{{ messageList }}}
      </div>

      <div class="selected-chat__input">
        {{{ messageInput }}}
      </div>
    </div>
  </div>
`;
