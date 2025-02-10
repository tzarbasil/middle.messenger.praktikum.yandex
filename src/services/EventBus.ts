export class EventBus {
  private listeners: Record<string, Array<(...args: unknown[]) => void>> = {};

  on(event: string, listener: (...args: unknown[]) => void): void {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }
    this.listeners[event].push(listener);
  }

  emit(event: string, ...args: unknown[]): void {
    if (this.listeners[event]) {
      this.listeners[event].forEach((listener) => listener(...args));
    }
  }

  off(event: string, listener: (...args: unknown[]) => void): void {
    if (!this.listeners[event]) return;

    this.listeners[event] = this.listeners[event].filter(
      (registeredListener) => registeredListener !== listener,
    );
  }
}
