import { defineCustomElement } from 'custom-elements-hmr-polyfill';

@defineCustomElement('app-root')
export class ElementX extends HTMLElement {
    constructor() {
        super();

        console.log('[app-root] Change me on-the-fly and be surprised! :)');
    }

    connectedCallback() {
        this.innerHTML = this.render();

        setTimeout(() => {
            const myFirstComp = this.querySelector('my-comp');

            if (myFirstComp) {
                myFirstComp.setAttribute('some-attribute', 'foo-mutated1');
            }
        }, 250);
    }

    render() {
        return `
            <ul>
                <my-comp name="1" some-attribute="foo"></my-comp>
                <my-comp name="2" some-attribute="bar"></my-comp>
            </ul>
        `;
    }
}
