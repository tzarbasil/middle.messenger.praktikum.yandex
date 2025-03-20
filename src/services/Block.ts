import Handlebars from 'handlebars';
import { EventBus } from './EventBus';

export type Props = Record<string, unknown>;

interface BlockType {
  _id: string;
  updateElement(): HTMLElement;
  setProps(nextProps: Props): void;
  element: HTMLElement | null;
  dispatchComponentDidMount(): void;
}

export class Block implements BlockType {
  _id: string = Math.random().toString(36).substr(2, 9);

  private _element: HTMLElement | null = null;

  children: { [key: string]: BlockType };

  lists: { [key: string]: unknown[] };

  props: Props;

  eventBus: () => EventBus;

  static EVENTS = {
    INIT: 'init',
    FLOW_CDM: 'flow:component-did-mount',
    FLOW_CDU: 'flow:component-did-update',
    FLOW_RENDER: 'flow:render',
  };

  constructor(child: Props = {}) {
    this._id = Math.random().toString(36).substring(2, 9);
    const eventBus = new EventBus();

    const { props, children, lists } = this._getChild(child);
    this.props = this._createProxy(props);
    this.children = children;
    this.lists = lists;
    this.eventBus = () => eventBus;
    this._registerEvents(eventBus);
    eventBus.emit(Block.EVENTS.INIT);
  }

  private _registerEvents(eventBus: EventBus) {
    eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
    eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
  }

  private _registerListener() {
    const { events = {} } = this.props as { events: Record<string, (event: Event) => void> };
    Object.keys(events).forEach((e) => {
      if (this._element) {
        this._element.addEventListener(e, events[e]);
      }
    });
  }

  private _removeEvents(): void {
    const { events = {} } = this.props as { events: Record<string, (event: Event) => void> };

    if (!events) return;

    Object.keys(events).forEach((e) => {
      if (this._element) {
        this._element.removeEventListener(e, events[e]);
      }
    });
  }

  protected init() {
    this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
  }

  protected componentDidMount(): void {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
  }

  private _componentDidMount() {
    this.componentDidMount();
    Object.values(this.children).forEach((child) => {
      child.dispatchComponentDidMount();
    });
  }

  public dispatchComponentDidMount() {
    this.eventBus().emit(Block.EVENTS.FLOW_CDM);
  }

  private _componentDidUpdate() {
    if (!this.componentDidUpdate()) return;
    this._render();
  }

  protected componentDidUpdate() {
    return true;
  }

  private _getChild(child: Props): {
    children: { [key: string]: BlockType };
    props: Props;
    lists: { [key: string]: unknown[] };
  } {
    const children: { [key: string]: BlockType } = {};
    const props: Props = {};
    const lists: { [key: string]: unknown[] } = {};

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

  public setProps(nextProps: Props): void {
    if (!nextProps) return;
    Object.assign(this.props, nextProps);
  }

  get element() {
    return this._element;
  }

  private _render(): void {
    const propsRegister = { ...this.props };

    Object.entries(this.children).forEach(([key, child]) => {
      propsRegister[key] = `<div data-id="${child._id}"></div>`;
    });

    Object.entries(this.lists).forEach(([key]) => {
      propsRegister[key] = '<div data-id="__l__"></div>';
    });

    const templateElem = document.createElement('template');
    templateElem.innerHTML = Handlebars.compile(this.render())(propsRegister);

    Object.values(this.children).forEach((child) => {
      const stub = templateElem.content.querySelector(`[data-id="${child._id}"]`);
      if (stub) {
        stub.replaceWith(child.updateElement());
      }
    });

    Object.entries(this.lists).forEach(([, child]) => {
      const listElem = document.createElement('template');
      child.forEach((item) => {
        if (item instanceof Block) {
          listElem.content.append(item.updateElement());
        } else {
          listElem.content.append(`${item}`);
        }
      });
      const stub = templateElem.content.querySelector('[data-id="__l__"]');
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
        const result = Reflect.set(target, prop, value);
        eventBus().emit(Block.EVENTS.FLOW_CDU);
        return result;
      },
      deleteProperty() {
        throw new Error('Нет доступа');
      },
    });
  }
}
