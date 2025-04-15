import { Button } from '../LoginButton';
import { Input } from '../MainInput';
import { Block } from '../../services/Block';
import './styles.scss';
import { FormLayout } from './mainForm';
import { validateField } from '../../services/validation';

interface MainFormInterface {
  inputs: Input[];
  button: Button;
  class?: string;
  events?: Record<string, (e: Event) => void>;
}

export class Form extends Block {
  constructor(props: MainFormInterface) {
    super({
      ...props,
      events: {
        submit: (e: SubmitEvent) => {
          e.preventDefault();
          this.onSubmit();
        },
      },
    });
  }

  private onSubmit() {
    const formData: Record<string, string> = {};
    let isValid = true;

    (this.lists.inputs as Block[]).forEach((input: Block) => {
      const inputElement = input.updateElement().tagName === 'input'
        ? (input.updateElement() as HTMLInputElement)
        : (input.updateElement().querySelector('input') as HTMLInputElement);

      if (inputElement instanceof HTMLInputElement) {
        const errorMessage = validateField(inputElement.name, inputElement.value);
        if (errorMessage) {
          isValid = false;
          this.setInputError(input, errorMessage);
        } else {
          this.setInputError(input, '');
        }

        formData[inputElement.name] = inputElement.value;
      }
    });

    if (isValid) {
      console.log('Form data:', formData);
    } else {
      console.log('Form validation failed');
    }
  }

  private setInputError(input: Block, errorMessage: string): void {
    const inputInstance = input as Input;
    inputInstance.setError(errorMessage);
  }

  override render() {
    return FormLayout;
  }
}
