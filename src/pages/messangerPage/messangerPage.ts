export const MessangerPageLayout = `
  <div>
    <div class="sidebar">
      {{{ MessangerHeader }}}
    <ul class="sidebar__chats">
      {{{ chatList }}}
     </ul>
    </div>
      <div class="chats">
        <p class="messanger__placeholder">Выберите чат чтобы отправить сообщение</p>
      </div>
  </div>
`;
