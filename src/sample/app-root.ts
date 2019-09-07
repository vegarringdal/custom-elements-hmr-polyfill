import { defineCustomElement } from './decorator/defineCustomElement';

@defineCustomElement('app-root')
export class ElementX extends HTMLElement {
    static foo = 'Foo man';

    constructor() {
        super();
        console.log('[app-root] Change me on-the-fly and be surprised! :)');
    }

    connectedCallback() {
        this.innerHTML = (this.constructor as any).render();

        setTimeout(() => {
            const myFirstComp = this.querySelector('my-comp');

            if (myFirstComp) {
                myFirstComp.setAttribute('some-attribute', 'foo-mutated');
            }
        }, 250);
    }

    static render() {
        return `
            <h1>${this.foo}</h1>
            <ul>
                <my-comp name="1" some-attribute="foo"></my-comp>
                <my-comp name="2" some-attribute="bar"></my-comp>
            </ul>
        `;
    }
}
