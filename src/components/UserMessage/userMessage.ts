export const UserMessageLayout = `
<div class="message{{#if isYours}} message_yours{{/if}}">
  <p class="message__content">{{text}}</p>
  <div class="companion_message_date">
    {{#if isYours}}
      {{#if isRead}}
        <div class="message__status">
        </div>
      {{else}}
        <div class="message__status">
        </div>
      {{/if}}
    {{/if}}
    <p class="message__time">{{time}}</p>
  </div>
</div>
`;
