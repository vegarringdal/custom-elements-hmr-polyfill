import { log } from './hmr';

export class ElementX extends HTMLElement {
    static ELEMENT_NAME = 'my-comp';

    constructor() {
        super();
    }

    @log
    connectedCallback() {
        const name = this.getAttribute('name');
        this.innerHTML = /*html*/ `
            <p>my comp: ${name}</p>
        `;
    }

    @log
    disconnectedCallback() {}

    @log
    adoptedCallback() {}

    @log
    attributeChangedCallback() {}
}

if (!customElements.get(ElementX.ELEMENT_NAME)) {
    customElements.define(ElementX.ELEMENT_NAME, ElementX);
}
