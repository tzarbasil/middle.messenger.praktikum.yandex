import { Block } from '../services/Block';
import { EventBus } from '../services/EventBus';

export class Page extends Block {
  constructor(props = {}) {
    super(props, new EventBus());
  }
}
