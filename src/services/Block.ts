import { EventBus } from './EventBus';

export abstract class Block<
  Props extends Record<string, unknown> = Record<string, unknown>,
> {
  protected props: Props;

  protected eventBus: EventBus;

  protected element: HTMLElement;

  constructor(props: Props, eventBus: EventBus) {
    this.props = props;
    this.eventBus = eventBus;
    this.element = this.createElement();
    this.addEvents(); 
  }

  protected createElement(): HTMLElement {
    return document.createElement('div');
  }

  protected addEvents(): void {
    const events = this.props.events as Record<string, (event: Event) => void> | undefined;

    if (events) {
      Object.entries(events).forEach(([eventName, handler]) => {
        this.element.addEventListener(eventName, handler);
      });
    }
  }

  protected removeEvents(): void {
    const events = this.props.events as Record<string, (event: Event) => void> | undefined;

    if (events) {
      Object.entries(events).forEach(([eventName, handler]) => {
        this.element.removeEventListener(eventName, handler);
      });
    }
  }

  public getElement(): HTMLElement {
    return this.element;
  }

  public destroy(): void {
    this.removeEvents();
    this.element.remove();
  }
}
