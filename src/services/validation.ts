// Регулярные выражения для валидации
export const regex = {
  firstName: /^[А-Яа-яA-Za-z]+(-[А-Яа-яA-Za-z]+)?$/, // латиница/кириллица, первая заглавная, без пробелов, дефис допустим
  login: /^[a-zA-Z][a-zA-Z0-9_-]{2,19}$/, // 3-20 символов, латиница, цифры, дефис/нижнее подчеркивание
  email: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/, // email
  password: /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,40}$/, // минимум 8 символов, заглавная буква и цифра
  phone: /^\+?\d{10,15}$/, // телефон
  message: /^(?!\s*$).+/ // сообщение не пустое
};

// Функция для валидации поля
export const validateField = (field: string, value: string): string => {
  let error = "";
  switch (field) {
    case "login":
      if (!regex.login.test(value)) error = "Логин должен быть от 3 до 20 символов, без пробелов и спецсимволов.";
      break;
    case "password":
      if (!regex.password.test(value)) error = "Пароль должен содержать хотя бы одну заглавную букву и цифру, быть длиной от 8 до 40 символов.";
      break;
    default:
      break;
  }
  return error;
};
