import { ProfileDataLayout } from './profileDataLayout';
import Block from '../../services/Block';

interface ProfileDataInterface {
  label: string;
  value: string;
  class?: string;
}

export class ProfileData extends Block {
  constructor(props: ProfileDataInterface) {
    super({
      ...props,
    });
  }

  override render() {
    return ProfileDataLayout;
  }
}
