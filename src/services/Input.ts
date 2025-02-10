import { EventBus } from "./EventBus";
import { Block } from "./Block";

export interface InputEventBus {
	label: string;
	type: string;
	name: string;
	placeholder: string;
	events?: Record<string, (event: Event) => void>;
}

export class Input extends Block<InputEventBus> {
	constructor(props: InputEventBus, eventBus: EventBus) {
		super(props, eventBus);
	}

	protected createElement(): HTMLElement {
		const div = document.createElement("div");
		const label = document.createElement("label");
		const input = document.createElement("input");
		input.type = this.props.type;
		input.name = this.props.name;
		input.placeholder = this.props.placeholder;


		label.textContent = this.props.label;
		label.appendChild(input);

		if (this.props.events?.input) {
			input.addEventListener("input", this.props.events.input);
		}

		div.appendChild(label);

		return div;
	}
}