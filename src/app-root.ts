import { log } from './hmr';

export class ElementX extends HTMLElement {
    static ELEMENT_NAME = 'app-root';

    constructor() {
        super();
    }

    @log
    connectedCallback() {
        this.innerHTML = /*html*/ `
            <ul>
                <my-comp name="1"></my-comp>
                <my-comp name="2"></my-comp>
            </ul>
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
