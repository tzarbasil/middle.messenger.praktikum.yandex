import { ChatPage } from './chatPage';

document.addEventListener('DOMContentLoaded', () => {
  const chatContainer = document.getElementById('chat');
  if (chatContainer) {
    const chatPageInstance = new ChatPage();
    chatContainer.appendChild(chatPageInstance.getElement());
  } else {
    console.error('Не найден контейнер #chat для рендеринга!');
  }
});
