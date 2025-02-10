import { EventBus } from './EventBus';

const eventBus = new EventBus();

class ErrorPage {
    private container: HTMLElement;

    constructor(container: HTMLElement) {
        this.container = container;
        eventBus.on('showError', this.render.bind(this));
    }

    render({ errorNumber, errorText, buttonText }: { errorNumber: number; errorText: string; buttonText: string; }) {
        this.container.innerHTML = `
            <main class="error_page error_page_${errorNumber}">
                <div class="error_container">
                    <h1 class="error_number">${errorNumber}</h1>
                    <h2 class="error_text">${errorText}</h2>
                    <button type="button" class="error_back_btn route_button">${buttonText}</button>
                </div>
            </main>
        `;

        this.container.querySelector('.error_back_btn')?.addEventListener('click', () => {
            eventBus.emit('navigate', '/chats');
        });
    }
}

// Использование
const errorContainer = document.getElementById('app'); // Укажите ваш контейнер
if (errorContainer) {
    new ErrorPage(errorContainer);
}

// Вызов ошибки
eventBus.emit('showError', {
    errorNumber: 404,
    errorText: 'Страница не найдена',
    buttonText: 'Назад к чатам'
});
