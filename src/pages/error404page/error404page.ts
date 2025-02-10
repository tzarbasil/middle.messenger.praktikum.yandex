import Handlebars from 'handlebars';
import { EventBus } from '../../services/EventBus';
import { Block } from '../../services/Block';

const eventBus = new EventBus();

export interface ErrorProps {
  errorNumber: number;
  errorText: string;
  buttonText: string;
  errorBtnLink: string;
  events?: Record<string, (event: Event) => void>;
  [key: string]: unknown; // Добавляем индексную сигнатуру
}

export class ErrorComponent extends Block<ErrorProps> {
  protected createElement(): HTMLElement {
    const div = document.createElement('div');
    div.innerHTML = `
      <main class="error_page error_page_${this.props.errorNumber}">
        <div class="error_container">
          <h1 class="error_number">${this.props.errorNumber}</h1>
          <h2 class="error_text">${this.props.errorText}</h2>
          <a href=${this.props.errorBtnLink} class="error_back_btn route_button">${this.props.buttonText}</a>
        </div>
      </main>
    `;

    const button = div.querySelector('.error_back_btn');
    if (button && this.props.events?.click) {
      button.addEventListener('click', this.props.events.click);
    }

    return div;
  }
}

const templateSource = `
<main class="error_page">
  <div id="error-wrapper"></div>
</main>
`;

const template = Handlebars.compile(templateSource);

const errorContainer = document.getElementById('app');
if (errorContainer) {
  errorContainer.innerHTML = template({});
  const errorWrapper = document.getElementById('error-wrapper');

  if (errorWrapper) {
    eventBus.on('showError', (context: ErrorProps) => {
      const errorComponent = new ErrorComponent(context, eventBus);
      errorWrapper.innerHTML = '';
      errorWrapper.appendChild(errorComponent.getElement());
    });
  }
}

eventBus.emit('showError', {
  errorNumber: 404,
  errorText: 'Страница не найдена',
  buttonText: 'Назад к чатам',
  errorBtnLink: '../chat/chat.html',
  events: {
    click: () => eventBus.emit('navigate', '/chats'),
  },
});
