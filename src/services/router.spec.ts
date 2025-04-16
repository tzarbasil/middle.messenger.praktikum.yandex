import { expect } from 'chai';
import sinon from 'sinon';
import { Router } from './Router.js';
import { Block } from './Block.js';
import { ProfileApi } from '../api/profileApi.js';

class MockBlock extends Block {
  updateElement() {
    const div = document.createElement('div');
    div.textContent = 'Mock Block';
    return div;
  }
}

describe('Router', () => {
  let router: Router;
  let rootElement: HTMLElement;

  beforeEach(() => {
    rootElement = document.createElement('div');
    rootElement.setAttribute('id', 'root');
    document.body.appendChild(rootElement);

    router = new Router('#root');
    router.use('/', MockBlock);
    router.use('/sign-up', MockBlock);
    router.use('/404', MockBlock);
  });

  afterEach(() => {
    document.body.innerHTML = '';
    sinon.restore();
  });

  it('должен добавлять маршрут с использованием метода use', () => {
    router.use('/test', MockBlock);
    expect((router as any).routes['/test']).to.equal(MockBlock);
  });

  it('должен корректно обрабатывать переходы по маршруту с методом go', () => {
    const spy = sinon.spy(router as any, 'onRouteChange');
    router.go('/sign-up');
    expect(spy.calledWith('/sign-up')).to.be.true;
  });

  it('должен обрабатывать возврат на предыдущую страницу методом back', () => {
    const spy = sinon.spy(window.history, 'back');
    router.back();
    expect(spy.calledOnce).to.be.true;
  });

  it('должен обрабатывать переход вперёд методом forward', () => {
    const spy = sinon.spy(window.history, 'forward');
    router.forward();
    expect(spy.calledOnce).to.be.true;
  });

  it('должен правильно обрабатывать изменение маршрута и отрисовку компонента', async () => {
    const pageChangeSpy = sinon.spy(router as any, 'onRouteChange');
    await (router as any).onRouteChange('/');
    expect(pageChangeSpy.calledWith('/')).to.be.true;
    expect(rootElement.innerHTML).to.include('Mock Block');
  });

  it('должен редиректить на / если пользователь не авторизован', async () => {
    sinon.stub(ProfileApi.prototype, 'request').throws(new Error('Unauthorized'));
    const redirectSpy = sinon.spy(router, 'go');

    await (router as any).onRouteChange('/profile');

    expect(redirectSpy.calledWith('/')).to.be.true;
  });

  it('должен редиректить на / если возникает ошибка при проверке авторизации', async () => {
    sinon.stub(ProfileApi.prototype, 'request').throws(new Error('Network Error'));
    const redirectSpy = sinon.spy(router, 'go');

    await (router as any).onRouteChange('/profile');

    expect(redirectSpy.calledWith('/')).to.be.true;
  });

  it('должен отрисовывать компонент по маршруту, если маршрут существует', async () => {
    const pageChangeSpy = sinon.spy(router as any, 'onRouteChange');
    await (router as any).onRouteChange('/');
    expect(rootElement.innerHTML).to.include('Mock Block');
    expect(pageChangeSpy.calledWith('/')).to.be.true;
  });

  it('должен отрисовывать страницу 404, если маршрут не существует', async () => {
    const pageChangeSpy = sinon.spy(router as any, 'onRouteChange');
    await (router as any).onRouteChange('/unknown');
    expect(rootElement.innerHTML).to.include('Mock Block');
    expect(pageChangeSpy.calledWith('/unknown')).to.be.true;
  });
});
