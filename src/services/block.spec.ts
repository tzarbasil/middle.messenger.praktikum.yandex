import { expect } from 'chai';
import sinon from 'sinon';
import Handlebars from 'handlebars';
import { Block } from './Block.js';

class TestBlock extends Block {
  protected render(): string {
    return '<div class="test-block">{{testProp}}</div>';
  }
}

describe('Block', () => {
  let compileStub: sinon.SinonStub;

  beforeEach(() => {
    compileStub = sinon.stub(Handlebars, 'compile').callsFake(() => () => '<div class="mocked">Rendered</div>');
  });

  afterEach(() => {
    compileStub.restore();
  });

  it('должен инициализировать Block с props', () => {
    const block = new TestBlock({ testProp: 'value' });
    expect(block.props.testProp).to.equal('value');
  });

  it('должен вызывать componentDidMount при dispatchComponentDidMount', () => {
    const block = new TestBlock();
    const cdmSpy = sinon.spy(block as any, 'componentDidMount');

    block.dispatchComponentDidMount();
    expect(cdmSpy.calledOnce).to.be.true;
  });

  it('setProps должен обновить props и вызвать FLOW_CDU', () => {
    const block = new TestBlock({ testProp: 'initial' });
    const eventBusEmitSpy = sinon.spy(block.eventBus(), 'emit');

    block.setProps({ testProp: 'updated' });

    expect(block.props.testProp).to.equal('updated');
    expect(eventBusEmitSpy.calledWith(Block.EVENTS.FLOW_CDU)).to.be.true;
  });

  it('прокси props должен вызывать FLOW_CDU при изменении свойства', () => {
    const block = new TestBlock({ testProp: 'value' });
    const eventBusEmitSpy = sinon.spy(block.eventBus(), 'emit');

    (block.props as any).testProp = 'newValue';

    expect(eventBusEmitSpy.calledWith(Block.EVENTS.FLOW_CDU)).to.be.true;
  });

  it('updateElement должен возвращать элемент после рендера', () => {
    const block = new TestBlock({ testProp: 'value' });

    block.dispatchComponentDidMount();
    const el = block.updateElement();

    expect(el).to.be.instanceOf(HTMLElement);
    expect(el.outerHTML).to.include('Rendered');
  });

  it('updateElement должен выбросить ошибку, если элемент не создан', () => {
    const block = new TestBlock();
    (block as any)._element = null;

    expect(() => block.updateElement()).to.throw('Элемент не создан');
  });

  it('должен вызывать _render при componentDidUpdate = true', () => {
    const block = new TestBlock();
    const renderSpy = sinon.spy(block as any, '_render');
    const cduSpy = sinon.spy(block as any, 'componentDidUpdate');

    block.eventBus().emit(Block.EVENTS.FLOW_CDU);

    expect(cduSpy.calledOnce).to.be.true;
    expect(renderSpy.calledOnce).to.be.true;
  });

  it('не должен вызывать _render, если componentDidUpdate возвращает false', () => {
    class CustomBlock extends TestBlock {
      protected componentDidUpdate(): boolean {
        return false;
      }
    }

    const block = new CustomBlock();
    const renderSpy = sinon.spy(block as any, '_render');

    block.eventBus().emit(Block.EVENTS.FLOW_CDU);

    expect(renderSpy.called).to.be.false;
  });

  it('должен регистрировать и удалять события из props.events', () => {
    const clickHandler = sinon.spy();
    const block = new TestBlock({
      events: {
        click: clickHandler,
      },
    });

    block.dispatchComponentDidMount();
    const el = block.updateElement();
    document.body.appendChild(el);

    const event = new window.MouseEvent('click', {
      bubbles: true,
      cancelable: true,
    });
    el.dispatchEvent(event);

    expect(clickHandler.calledOnce).to.be.true;
  });

  it('должен заменять children по data-id', () => {
    compileStub.restore();

    class ChildBlock extends Block {
      protected render() {
        return '<span>child</span>';
      }

      updateElement() {
        const el = document.createElement('span');
        el.textContent = 'child';
        return el;
      }
    }

    class ParentBlock extends Block {
      protected render() {
        return '<div>{{{child}}}</div>';
      }
    }

    const child = new ChildBlock();
    const parent = new ParentBlock({ child });

    parent.dispatchComponentDidMount();
    const el = parent.updateElement();

    expect(el.innerHTML).to.include('child');
  });
});
