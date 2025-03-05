import { InputField } from './InputFields';
import { Block } from '../../services/Block';
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
  error?: string;  // Добавляем поле для ошибки
}

export class Input extends Block {
  error: string;

  constructor(props: MainInputInterface) {
    super({
      ...props,
      error: '', // Изначально ошибки нет
      inputField: new InputField({
        ...props,
      }),
      events: {
        blur: (event: FocusEvent) => {
          const input = event.target as HTMLInputElement;
          const errorMessage = validateField(input.name, input.value);
          this.error = errorMessage || ''; // Устанавливаем ошибку
        },
      },
    });
    this.error = ''; // Изначально ошибка пуста
  }

  override render() {
    return InputLayout; // Дополнительно в шаблоне можно отобразить this.error
  }
}
