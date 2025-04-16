import { Block } from './Block.js';
import { ProfileApi } from '../api/profileApi.js';

class Router {
  private routes: Record<string, typeof Block> = {};

  private currentPage: Block | null = null;

  private rootQuery: string;

  constructor(rootQuery: string) {
    this.rootQuery = rootQuery;

    window.addEventListener('popstate', () => {
      this.onRouteChange(window.location.pathname);
    });
  }

  public use(path: string, Page: typeof Block) {
    this.routes[path] = Page;
    return this;
  }

  public start() {
    this.onRouteChange(window.location.pathname);
  }

  public go(path: string) {
    window.history.pushState({}, '', path);
    this.onRouteChange(path);
  }

  public replace(path: string) {
    window.history.replaceState({}, '', path);
    this.onRouteChange(path);
  }

  public back() {
    window.history.back();
  }

  public forward() {
    window.history.forward();
  }

  private async onRouteChange(path: string) {
    const publicPages = ['/', '/sign-up'];

    if (!publicPages.includes(path)) {
      try {
        const response = await new ProfileApi().request();

        if (response.status !== 200) {
          console.log('Неавторизованный пользователь, редирект на /');
          this.go('/');
          return;
        }
      } catch (error) {
        console.error('Ошибка при проверке авторизации:', error);
        this.go('/');
        return;
      }
    }

    const Page = this.routes[path] || this.routes['/404'];
    if (!Page) return;

    const root = document.querySelector(this.rootQuery);
    if (root) root.innerHTML = '';

    this.currentPage = new Page();
    if (root) root.appendChild(this.currentPage.updateElement());
  }
}

const router = new Router('#app');
export { Router, router };
