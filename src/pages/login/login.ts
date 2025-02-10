import Handlebars from "handlebars";
import { EventBus } from "../../services/EventBus";
import { Input, InputEventBus } from "../../services/Input";
import { validateField } from "../../services/validation";

interface Context {
	title: string;
	fields: InputEventBus[];
	authButton: string;
	authButtonLink: string;
	regButton: string;
	regButtonLink: string;
}

const context: Context = {
	title: "Вход",
	fields: [
		{ label: "Логин", type: "text", name: "login", placeholder: "Имя" },
		{
			label: "Пароль",
			type: "password",
			name: "password",
			placeholder: "Пароль",

		},
	],
	authButton: "Авторизоваться",
	regButton: "Нет аккаунта?",
	authButtonLink: "/src/pages/chat/chat.html",
	regButtonLink: "/src/pages/registration/register_page.html",
};

const templateSource = `
<main class="login_page">
<form class="main__form">
    <h2 class="main__form_title">{{title}}</h2>
    <div class="main__form_inputs" id="input-render"></div>
    <div class="btn_container">
        <a href="{{authButtonLink}}" class="main__form_auth_btn route_button">{{authButton}}</a>
        <a href="{{regButtonLink}}" class="main__form_reg_btn route_button">{{regButton}}</a>
    </div>
</form>
</main>
`;

const loginElement = document.getElementById("login");
const eventBus = new EventBus();

const template = Handlebars.compile(templateSource);
const html = template(context);

if (loginElement) {
	loginElement.innerHTML = html;

	const renderInput = document.getElementById("input-render");

	if (renderInput) {
		context.fields.forEach((field) => {
			const inputItem = new Input(field, eventBus);
			renderInput.appendChild(inputItem.getElement());
		});
	}
}

const inputs = document.querySelectorAll(".main__form_inputs input");
inputs.forEach((input) => {
  input.addEventListener("blur", (e) => {
    const target = e.target as HTMLInputElement; // Явное приведение к HTMLInputElement
    const field = target.name;
    const value = target.value;
    const error = validateField(field, value); // Используем импортированную функцию

    const errorElement = document.getElementById(`${field}Error`);
    if (errorElement) {
      errorElement.textContent = error;
    }
  });
});

const form = document.getElementById("loginForm");
if (form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    let isValid = true;
    inputs.forEach((input) => {
      const target = input as HTMLInputElement; // Явное приведение к HTMLInputElement
      const field = target.name;
      const value = target.value;
      const error = validateField(field, value); // Используем импортированную функцию
      const errorElement = document.getElementById(`${field}Error`);
      if (errorElement) {
        if (error) {
          isValid = false;
          errorElement.textContent = error;
        } else {
          errorElement.textContent = "";
        }
      }
    });

    if (isValid) {
      alert("Форма отправлена!");
      // Здесь можно добавить логику отправки данных на сервер
    }
  });
}

