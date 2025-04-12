export const InputFieldLayout = `
<input ref="input" type="{{type}}" id="{{name}}" name="{{name}}"
  class="input input_{{name}}" {{#if required}}required{{/if}}
  {{#if placeholder}}placeholder="{{placeholder}}"{{else}}placeholder=" "{{/if}}
  {{#if value}}value="{{value}}"{{/if}}
/>
`;
