import { InputField } from './InputFields';
import Block from '../../services/Block';
import { InputLayout } from './mainInput';
import { validateField } from '../../services/validation';

interface MainInputInterface {
  name: string;
  label?: string;
  type: string;
  required?: boolean;
  placeholder?: string;
  value?: string;
  class?: string;
  events?: Record<string, (event: Event) => void>;
}

export class Input extends Block {
  constructor(props: MainInputInterface) {
    super({
      ...props,
      error: '',
      inputField: new InputField({
        ...props,
      }),
      events: {
        blur: (event: FocusEvent) => {
          const input = event.target as HTMLInputElement;
          const errorMessage = validateField(input.name, input.value);
          if (errorMessage) {
            alert(errorMessage);
          }
        },
      },
    });
  }

  override render() {
    return InputLayout;
  }
}
