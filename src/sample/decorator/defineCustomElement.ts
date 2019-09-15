export function defineCustomElement(
    elementName: string,
    elementDefinitionOptions?: ElementDefinitionOptions
) {
    return function reg(impl: any) {
        if (elementDefinitionOptions) {
            customElements.define(elementName, impl, elementDefinitionOptions);
        } else {
            customElements.define(elementName, impl);
        }
    };
}

export function customElementExtended(
    elementName: any,
    elementDefinitionOptions?: ElementDefinitionOptions
) {
    return function reg(elementClass: any) {
        const base = class extends elementClass {
            constructor() {
                super();
            }

            connectedCallback() {
                if (super.connectedCallback) {
                    super.connectedCallback.call(this);
                }
            }
            disconnectedCallback() {
                if (super.disconnectedCallback) {
                    super.disconnectedCallback.call(this);
                }
            }
            attributeChangedCallback(name: any, oldValue: any, newValue: any) {
                if (super.attributeChangedCallback) {
                    super.attributeChangedCallback.call(this, name, oldValue, newValue);
                }
            }
        };
        if (elementDefinitionOptions) {
            customElements.define(elementName, base, elementDefinitionOptions);
        } else {
            customElements.define(elementName, base);
        }
    };
}
