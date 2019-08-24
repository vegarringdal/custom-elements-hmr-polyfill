import { customElement, log } from './hmr';

@customElement('app-root')
export class ElementX extends HTMLElement {
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
