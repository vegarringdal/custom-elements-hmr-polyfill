import { defineCustomElement, customElementExtended } from './decorator/defineCustomElement';

@defineCustomElement('app-one')
export class ElementX extends HTMLElement {
    static foo = 'Foo man';
    notStatic = 'foo-mutated';

    constructor() {
        super();
        console.log('[app-root] constructor');
    }

    connectedCallback() {
        this.innerHTML = (this.constructor as any).render();

        setTimeout(() => {
            const myFirstComp = this.querySelector('my-comp');

            if (myFirstComp) {
                myFirstComp.setAttribute('some-attribute', this.getNewValue());
            }
        }, 250);
    }

    getNewValue() {
        return this.notStatic;
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

@customElementExtended('app-two')
export class ElementY extends HTMLElement {
    static foo = 'Foo man';
    notStatic = 'foo-mutatsed';

    constructor() {
        super();
        console.log('[app-root] constructor');
    }

    connectedCallback() {
        this.innerHTML = (this.constructor as any).render();

        setTimeout(() => {
            const myFirstComp = this.querySelector('my-comp');

            if (myFirstComp) {
                myFirstComp.setAttribute('some-attribute', this.getNewValue());
            }
        }, 250);
    }

    getNewValue() {
        return this.notStatic;
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
