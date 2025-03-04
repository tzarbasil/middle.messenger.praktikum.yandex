export const MessangerLayout = `
<a class="messanger" href={{href}}>
  <div class="messanger__content">
    <div class="messanger__list_item_avatar"></div>
    <div class="messanger__text">
      <p class="messanger__list_item_name">{{user}}</p>
      <div class="messanger__list_item_message-wrap">
        <p class="messanger__list_item_message">{{message}}</p>
      </div>
    </div>
  </div>
  <div class="messanger__meta">
    <div class="messanger__list_item_time">{{time}}</div>
  </div>
</a>
`;
