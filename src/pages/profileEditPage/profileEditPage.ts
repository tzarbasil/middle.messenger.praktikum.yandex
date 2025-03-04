export const ProfileEditPageLayout = `
  <div>
      {{{ sidebar}}}
      <div class="profile">
        <img class="profile__image" src={{profileImage}} alt="{{title}}" />
        {{{ form }}}
      </div>
  </div>
`;
