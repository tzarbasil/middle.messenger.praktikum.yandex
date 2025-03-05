import { Button } from '../LoginButton';
import { Input } from '../MainInput';
import { Block } from '../../services/Block';
import './styles.scss';
import { FormLayout } from './mainForm';
import { validateField } from '../../services/validation'; // Импортируем функцию для валидации

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
    let isValid = true; // Флаг для проверки валидации всех полей

    // Проходим по всем полям формы и проверяем их
    (this.lists.inputs as Block[]).forEach((input: Block) => {
      const inputElement = input.updateElement().tagName === 'input'
        ? (input.updateElement() as HTMLInputElement)
        : (input.updateElement().querySelector('input') as HTMLInputElement);

      if (inputElement instanceof HTMLInputElement) {
        const errorMessage = validateField(inputElement.name, inputElement.value); // Валидация поля
        if (errorMessage) {
          isValid = false; // Если хотя бы одно поле невалидно, устанавливаем флаг в false
          // Приводим тип input к классу Input и устанавливаем ошибку
          (input as Input).error = errorMessage; // Приведение типа
        } else {
          // Если поле валидно, сбрасываем ошибку
          (input as Input).error = '';
        }

        formData[inputElement.name] = inputElement.value; // Добавляем данные в объект
      }
    });

    // Если форма валидна, выводим данные, иначе выводим ошибку
    if (isValid) {
      console.log('Form data:', formData);
    } else {
      console.log('Form validation failed');
    }
  }

  override render() {
    return FormLayout;
  }
}
