import { Block } from '../../../services/Block';

import { InputFieldLayout } from './mainInputField';

interface InputFieldsInterface {
  name: string;
  label?: string;
  type: string;
  required?: boolean;
  placeholder?: string;
  value?: string;
  class?: string;
  icon?: string;
  events?: Record<string, (event: Event) => void>;
}

export class InputField extends Block {
  constructor(props: InputFieldsInterface) {
    super({
      ...props,
    });
  }

  override render() {
    return InputFieldLayout;
  }
}
