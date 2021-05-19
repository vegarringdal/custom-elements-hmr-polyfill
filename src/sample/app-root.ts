import { customElementExtended } from './decorator/defineCustomElement';

// element is defined
@customElementExtended('root-app')
export class ElementNo1 extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
        <super-extend-element></super-extend-element>
        <div is="element-no1"></div>
        <element-no2></element-no2>
        <div is="element-no3"></div>
        `;
    }
}
