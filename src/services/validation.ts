export const regex = {
  firstName: /^[А-ЯЁа-яёA-Za-z]+(-[А-ЯЁа-яёA-Za-z]+)?$/,
  login: /^[a-zA-Z][a-zA-Z0-9_-]{2,19}$/,
  email: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
  password: /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,40}$/,
  phone: /^\+?\d{10,15}$/,
  message: /^(?!\s*$).+/,
};

export const validateField = (field: string, value: string): string => {
  let error = '';
  switch (field) {
    case 'firstName':
      if (!regex.firstName.test(value)) {
        error = 'Имя должно содержать только буквы (кириллица/латиница), может включать дефис.';
      }
      break;
    case 'login':
      if (!regex.login.test(value)) {
        error = 'Логин должен быть от 3 до 20 символов, без пробелов и спецсимволов.';
      }
      break;
    case 'email':
      if (!regex.email.test(value)) {
        error = 'Введите корректный email.';
      }
      break;
    case 'password':
      if (!regex.password.test(value)) {
        error = 'Пароль должен содержать хотя бы одну заглавную букву и цифру, быть длиной от 8 до 40 символов.';
      }
      break;
    case 'phone':
      if (!regex.phone.test(value)) {
        error = 'Телефон должен содержать от 10 до 15 цифр, допускается + в начале.';
      }
      break;
    case 'message':
      if (!regex.message.test(value)) {
        error = 'Сообщение не должно быть пустым.';
      }
      break;
    default:
      break;
  }
  return error;
};
