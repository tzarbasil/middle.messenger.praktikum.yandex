import Handlebars from 'handlebars';
import { EventBus } from './EventBus';

export type Props = Record<string, unknown>;

class Block {
  static EVENTS = {
    INIT: 'init',
    FLOW_CDM: 'flow:component-did-mount',
    FLOW_CDU: 'flow:component-did-update',
    FLOW_RENDER: 'flow:render',
  };

  private _id: string;

  private _element: HTMLElement | null = null;

  children: Record<string, Block>;

  lists: Record<string, unknown[]>;

  props: Props;

  eventBus: () => EventBus;

  constructor(child: Props = {}) {
    const eventBus = new EventBus();

    const { props, children, lists } = this._getChild(child);
    this.props = this._createProxy(props);
    this.children = children;
    this.lists = lists;
    this.eventBus = () => eventBus;
    this._registerEvents(eventBus);
    eventBus.emit(Block.EVENTS.INIT);
  }

  private _registerListener() {
    const { events = {} } = this.props as {
      events: Record<string, EventListener>;
    };

    Object.keys(events).forEach((e) => {
      if (this._element) {
        this._element.addEventListener(e, events[e]);
      }
    });
  }

  private _removeEvents(): void {
    const { events = {} } = this.props as {
      events: Record<string, EventListener>;
    };

    if (!events) return;

    Object.keys(events).forEach((e) => {
      if (this._element) {
        this._element.removeEventListener(e, events[e]);
      }
    });
  }

  private _registerEvents(eventBus: EventBus) {
    eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
    eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
  }

  protected init() {
    this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
  }

  private _componentDidMount() {
    this.componentDidMount();
    Object.values(this.children).forEach((child) => {
      child.dispatchComponentDidMount();
    });
  }

  protected componentDidMount(): void {

  }

  public dispatchComponentDidMount() {
    this.eventBus().emit(Block.EVENTS.FLOW_CDM);
  }

  private _componentDidUpdate() {
    const response = this.componentDidUpdate();
    if (!response) {
      return;
    }
    this._render();
  }

  protected componentDidUpdate() {
    return true;
  }

  private _getChild(child: Props): {
    children: Record<string, Block>;
    props: Props;
    lists: Record<string, unknown[]>;
  } {
    const children: Record<string, Block> = {};
    const props: Props = {};
    const lists: Record<string, unknown[]> = {};

    Object.entries(child).forEach(([key, value]) => {
      if (value instanceof Block) {
        children[key] = value;
      } else if (Array.isArray(value)) {
        lists[key] = value;
      } else {
        props[key] = value;
      }
    });

    return { children, props, lists };
  }

  protected registelProp(): void {
    const property = this.props.property as Record<string, unknown>;

    if (!property) return;

    Object.entries(property).forEach(([key, value]) => {
      if (this._element) {
        this._element.setAttribute(key, value as string);
      }
    });
  }

  public setProps = (nextProps: Props): void => {
    if (!nextProps) {
      return;
    }

    Object.assign(this.props, nextProps);
  };

  get element() {
    return this._element;
  }

  private _render(): void {
    const propsRegister = { ...this.props };

    Object.entries(this.children).forEach(([key, child]) => {
      propsRegister[key] = `<div data-id="${child._id}"></div>`;
    });

    Object.entries(this.lists).forEach(([key]) => {
      propsRegister[key] = '<div data-id="__l_"></div>';
    });

    const templateElem = this._createDocumentElement('template');
    templateElem.innerHTML = Handlebars.compile(this.render())(propsRegister);

    Object.values(this.children).forEach((child) => {
      const stub = templateElem.content.querySelector(`[data-id="${child._id}"]`);
      if (stub) {
        stub.replaceWith(child.updateElement());
      }
    });

    Object.entries(this.lists).forEach(([, child]) => {
      const listElem = this._createDocumentElement('template');
      child.forEach((item) => {
        if (item instanceof Block) {
          listElem.content.append(item.updateElement());
        } else {
          listElem.content.append(`${item}`);
        }
      });
      const stub = templateElem.content.querySelector('[data-id="__l_"]');
      if (stub) {
        stub.replaceWith(listElem.content);
      }
    });

    const firstElem = templateElem.content.firstElementChild as HTMLElement;

    if (this._element && firstElem) {
      this._element.replaceWith(firstElem);
    }
    this._element = firstElem;
    this._removeEvents();
    this._registerListener();
    this.registelProp();
  }

  protected render(): string {
    return '';
  }

  public updateElement(): HTMLElement {
    if (!this._element) {
      throw new Error('Элемент не создан');
    }
    return this._element;
  }

  private _createProxy(props: Props): Props {
    const eventBus = () => this.eventBus();

    return new Proxy(props, {
      get(target, prop: string) {
        const value = target[prop];
        return typeof value === 'function' ? value.bind(target) : value;
      },
      set(target, prop: string, value) {
        target[prop] = value;

        eventBus().emit(Block.EVENTS.FLOW_CDU, { ...target }, target);
        return true;
      },
      deleteProperty() {
        throw new Error('Нет доступа');
      },
    });
  }

  private _createDocumentElement(tagName: string) {
    return document.createElement(tagName) as HTMLTemplateElement;
  }
}

export default Block;
