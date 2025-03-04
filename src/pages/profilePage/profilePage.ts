export const ProfilePageLayout = `
  <div>
      {{{ sidebar}}}

      <div class="profile__page_container">
        <div class="avatar profile__avatar">
          <label class="avatar__label">
            <div class="avatar__image-wrap">
              <img class="avatar__image" src={{profileImage}} alt="{{title}}" />
            </div>
            <input class="avatar__input" type="file" name="file" accept="image/png, image/jpeg" />
          </label>
        </div>

        <h1 class="profile__title">{{title}}</h1>
        <div class="profile__fields">
          {{{ profile }}}
        </div>


        <div class="btn_container">
            {{{ editProfile }}}
            {{{ changePassword }}}
            {{{ logout }}}
        </div>
      </div>
  </div>
`;
