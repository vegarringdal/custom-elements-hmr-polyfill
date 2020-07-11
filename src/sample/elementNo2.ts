import { defineCustomElement } from './decorator/defineCustomElement';

@defineCustomElement('element-no2')
export class ElementNo2 extends HTMLElement {
    static staticName = 'element-no2';
    foo = 'foo';

    constructor() {
        super();
        console.log(`[element-no2]`, 'constructor');
    }

    connectedCallback() {
        console.log(`[element-no2]`, 'connectedCallback');
        this.innerHTML = (this.constructor as any).render(
            (this.constructor as any).getStaticValue(),
            this.getInstanceValue()
        );
    }

    getInstanceValue() {
        console.log(`[element-no2]`, 'getInstanceValue', this.foo);
        return this.foo;
    }

    static getStaticValue() {
        console.log(`[element-no2]`, 'getStaticValue', this.staticName);
        return this.staticName;
    }

    static render(...args) {
        console.log(`[element-no2]`, 'render', ...args);
        return `
            <h1>${args.join(' - ')}</h1>
        `;
    }
}
