import Handlebars from "handlebars";
import { EventBus } from "../../services/EventBus";
import { Input, InputEventBus } from "../../services/Input";

interface Context {
	title: string;
	fields: InputEventBus[];
	authButton: string;
	authButtonLink: string;
	regButton: string;
	regButtonLink: string;
}

const context: Context = {
	title: "Регистрация",
	fields: [
		{ label: "Имя", type: "text", name: "first_name", placeholder: "Имя" },
		{
			label: "Фамилия",
			type: "text",
			name: "second_name",
			placeholder: "Фамилия",
		},
		{ label: "Логин", type: "text", name: "login", placeholder: "Логин" },
		{ label: "Почта", type: "text", name: "email", placeholder: "Почта" },
		{
			label: "Пароль",
			type: "password",
			name: "password",
			placeholder: "Пароль",

		},
		{
			label: "Телефон",
			type: "tel",
			name: "phone",
			placeholder: "Телефон",
		},
	],
	authButton: "Зарегистрироваться",
	regButton: "Войти",
	authButtonLink: "/src/pages/chat/chat.html",
	regButtonLink: "/src/pages/login/login.html",
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

const authElement = document.getElementById("registration");
const eventBus = new EventBus();

const template = Handlebars.compile(templateSource);
const html = template(context);

if (authElement) {
	authElement.innerHTML = html;

	const renderInput = document.getElementById("input-render");

	if (renderInput) {
		context.fields.forEach((field) => {
			const inputItem = new Input(field, eventBus);
			renderInput.appendChild(inputItem.getElement());
		});
	}
}
