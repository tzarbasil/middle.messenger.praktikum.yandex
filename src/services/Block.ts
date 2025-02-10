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

		this._addEvents();
	}

	protected createElement(): HTMLElement {
		return document.createElement("div");
	}

	private _addEvents(): void {
		const events = this.props.events as Record<string, EventListener> | undefined;

		if (events) {
			Object.entries(events).forEach(([eventName, handler]: [string, EventListener]) => {
				this.element.addEventListener(eventName, handler);
			});
		}
	}

	private _removeEvents(): void {
		const events = this.props.events as Record<string, EventListener> | undefined;

		if (events) {
			Object.entries(events).forEach(([eventName, handler]: [string, EventListener]) => {
				this.element.removeEventListener(eventName, handler);
			});
		}
	}

	public getElement(): HTMLElement {
		return this.element;
	}

	public destroy(): void {
		this._removeEvents();
		this.element.remove();
	}
}
