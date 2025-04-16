import { expect } from 'chai';
import sinon from 'sinon';
import { EventBus } from './EventBus.js';

describe('EventBus', () => {
  let bus: EventBus;

  beforeEach(() => {
    bus = new EventBus();
  });

  it('должен вызывать подписчика при emit', () => {
    const spy = sinon.spy();

    bus.on('greet', spy);
    bus.emit('greet', 'hello');

    expect(spy.calledOnceWith('hello')).to.be.true;
  });
  it('должен вызывать всех подписчиков события', () => {
    let count = 0;
    const cb1 = () => count++;
    const cb2 = () => count++;

    bus.on('inc', cb1);
    bus.on('inc', cb2);
    bus.emit('inc');

    expect(count).to.equal(2);
  });

  it('должен удалять подписку через off', () => {
    const cb = sinon.spy();

    bus.on('event', cb);
    bus.off('event', cb);
    bus.emit('event');

    expect(cb.called).to.be.false;
  });

  it('off должен кидать ошибку, если события не существует', () => {
    const dummy = () => {};
    expect(() => bus.off('none', dummy)).to.throw('Нет события: none');
  });

  it('emit должен кидать ошибку, если события не существует', () => {
    expect(() => bus.emit('missing')).to.throw('Нет события: missing');
  });
});
