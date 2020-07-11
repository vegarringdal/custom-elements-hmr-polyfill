import { customElementExtended } from './decorator/defineCustomElement';

@customElementExtended('element-no1', { extends: 'div' })
export class ElementNo1 extends HTMLDivElement {
    static staticName = 'element-no1';
    foo = 'foo';

    constructor() {
        super();
        console.log(`[element-no1]`, 'constructor');
    }

    connectedCallback() {
        console.log(`[element-no1]`, 'connectedCallback');
        this.innerHTML = (this.constructor as any).render(
            (this.constructor as any).getStaticValue(),
            this.getInstanceValue()
        );
    }

    getInstanceValue() {
        console.log(`[element-no1]`, 'getInstanceValue', this.foo);
        return this.foo;
    }

    static getStaticValue() {
        console.log(`[element-no1]`, 'getStaticValue', this.staticName);
        return this.staticName;
    }

    static render(...args) {
        console.log(`[element-no1]`, 'render', ...args);
        return `
            <h1>${args.join(' - ')}</h1>
        `;
    }
}
