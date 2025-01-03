import Handlebars from "handlebars";
import * as Pages from "./pages";
import * as Components from "./components";
import "./assets/fonts.css";
import "./scss/styles.scss";

Handlebars.registerPartial("authButton", Components.authButton);
Handlebars.registerPartial("regButton", Components.regButton);
Handlebars.registerPartial("errorBackButton", Components.errorBackButton);
Handlebars.registerPartial("errorNumber", Components.errorNumber);
Handlebars.registerPartial("errortText", Components.errortText);

export default class App {
  constructor() {
    this.state = {
      pageLocation: "navigation_page",
    };
    this.pageTemplate = document.getElementById("app");
  }

  render() {
    let template;

    if (this.state.pageLocation === "login_page") {
      template = Handlebars.compile(Pages.loginPage);
      this.pageTemplate.innerHTML = template({
        auth_btn_text: "Авторизоваться",
        btn_text: "Нет аккаунта?",
      });
    }

    if (this.state.pageLocation === "navigation_page") {
      template = Handlebars.compile(Pages.navigationPage);
      this.pageTemplate.innerHTML = template({});
    }

    if (this.state.pageLocation === "messanger_page") {
      template = Handlebars.compile(Pages.messangerPage);
      this.pageTemplate.innerHTML = template({});
    }

    if (this.state.pageLocation === "register_page") {
      template = Handlebars.compile(Pages.registerPage);
      this.pageTemplate.innerHTML = template({
        form_title: "Регистрация",
        email: "pochta@yandex.ru",
        login: "ivanivanov",
        first_name: "Иван",
        second_name: "Иванов",
        phone: "+7 (909) 967 30 30",
        password: "very_secret_password",
        auth_btn_text: "Зарегестрироваться",
        btn_text: "Войти",
      });
    }

    if (this.state.pageLocation === "profile__page") {
      template = Handlebars.compile(Pages.profilePage);
      this.pageTemplate.innerHTML = template({});
    }

    if (this.state.pageLocation === "error_page") {
      template = Handlebars.compile(Pages.error404page);
      this.pageTemplate.innerHTML = template({
        errorNumber: "404",
        errortText: "Не туда попали",
      });
    }

    if (this.state.pageLocation === "error_page_500") {
      template = Handlebars.compile(Pages.error500page);
      this.pageTemplate.innerHTML = template({
        errorNumber: "500",
        errortText: "Мы уже фиксим",
      });
    }

    this.routingButtonListeners();
  }

  routingButtonListeners() {
    const routingButtons = document.querySelectorAll(".route_button");
    const navButtons = document.querySelectorAll(".navigation_link");

    navButtons.forEach((routeBtn) => {
      routeBtn.addEventListener("click", (e) => {
        e.preventDefault();
        this.routingToPage(e.target.dataset.current_page);
      });
    });

    routingButtons.forEach((routeBtn) => {
      routeBtn.addEventListener("click", (e) => {
        e.preventDefault();
        this.routingToPage(e.target.dataset.current_page);
      });
    });
  }

  routingToPage(current_page) {
    this.state.pageLocation = current_page;
    this.render();
  }
}
