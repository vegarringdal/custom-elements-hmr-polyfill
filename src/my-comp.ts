import { customElement, log } from './hmr';

@customElement('my-comp')
export default class extends HTMLElement {
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
