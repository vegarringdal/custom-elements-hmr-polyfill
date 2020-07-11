import { customElementExtended } from './decorator/defineCustomElement';

@customElementExtended('element-no3', { extends: 'div' })
export class ElementNo3 extends HTMLDivElement {
    static staticName = 'element-no3';
    foo = 'foo';

    constructor() {
        super();
        console.log(`[element-no3]`, 'constructor');
    }

    connectedCallback() {
        console.log(`[element-no3]`, 'connectedCallback');
        this.innerHTML = (this.constructor as any).render(
            (this.constructor as any).getStaticValue(),
            this.getInstanceValue()
        );
    }

    getInstanceValue() {
        console.log(`[element-no3]`, 'getInstanceValue', this.foo);
        return this.foo;
    }

    static getStaticValue() {
        console.log(`[element-no3]`, 'getStaticValue', this.staticName);
        return this.staticName;
    }

    static render(...args) {
        console.log(`[element-no3]`, 'render', ...args);
        return `
            <h1>${args.join(' - ')}</h1>
        `;
    }
}
