import { JSDOM } from 'jsdom';

const dom = new JSDOM('<!doctype html><html><body><div id="app"></div></body></html>', {
  url: 'https://example.org/',
});

globalThis.document = dom.window.document;
globalThis.HTMLElement = dom.window.HTMLElement;
globalThis.Node = dom.window.Node;
globalThis.history = dom.window.history;
globalThis.CustomEvent = dom.window.CustomEvent;
globalThis.XMLHttpRequest = dom.window.XMLHttpRequest;
(globalThis as any).window = dom.window;
