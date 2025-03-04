import { Button } from '../LoginButton';
import { Input } from '../MainInput';
import { Block } from '../../services/Block';
import './styles.scss';
import { FormLayout } from './mainForm';

interface MainFormInterface {
  inputs: Input[];
  button: Button;
  class?: string;
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
    (this.lists.inputs as Block[]).forEach((input: Block) => {
      const inputElement = input.updateElement().tagName === 'input'
        ? (input.updateElement() as HTMLInputElement)
        : (input.updateElement().querySelector('input') as HTMLInputElement);
      if (inputElement instanceof HTMLInputElement) {
        formData[inputElement.name] = inputElement.value;
      }
    });

    console.log('Form data:', formData);
  }

  override render() {
    return FormLayout;
  }
}
