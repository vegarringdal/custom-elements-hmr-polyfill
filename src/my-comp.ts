import { customElement } from './hmr';

@customElement('my-comp')
export default class extends HTMLElement {
    'some-attribute': string = 'foo';

    constructor() {
        super();
        console.log('[my-comp] constructor()');
    }

    observedAttributes() {
        const observedAttributes = ['some-attribute'];
        console.log('observedAttributes', observedAttributes);
        return observedAttributes;
    }

    connectedCallback() {
        console.log(' [my-comp] connectedCallback()');

        const name = this.getAttribute('name');
        this.innerHTML = /*html*/ `
            <p>my comp: ${name}</p>
        `;
    }

    disconnectedCallback() {
        console.log('[my-comp] disconnectedCallback()', ...arguments);
    }

    adoptedCallback() {
        console.log('[my-comp] adoptedCallback()', ...arguments);
    }

    attributeChangedCallback(name: string, oldValue: string, newValue: string) {
        console.log('[my-comp] attribute changed', ...arguments);
    }
}
