import { customElement } from './hmr';

@customElement('app-root')
export class ElementX extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <ul>
                <my-comp name="1" some-attribute="foo"></my-comp>
                <my-comp name="2" some-attribute="bar"></my-comp>
            </ul>
        `;

        setTimeout(() => {
            const myFirstComp = this.querySelector('my-comp');

            if (myFirstComp) {
                console.log('myFirstComp setAttribute');
                myFirstComp.setAttribute('some-attribute', 'baz');
            }
        }, 500);
    }

    disconnectedCallback() {}

    adoptedCallback() {}

    attributeChangedCallback() {}
}
