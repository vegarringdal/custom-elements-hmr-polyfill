if (document.body) {
    setTimeout(() => {
        const oldBodyHtml = document.body.innerHTML;
        document.body.innerHTML = '';
        document.body.innerHTML = oldBodyHtml;
    }, 500);
}

/**
 * Simple class to hold newest instance
 */
export class elementCache {
    static setElement(name: string, elementClass: any) {
        this.init();
        (<any>globalThis).fuseboxHMR[name] = elementClass;
    }

    static getElement(name: string) {
        this.init();

        return (<any>globalThis).fuseboxHMR[name];
    }

    static init() {
        if (!(<any>globalThis).fuseboxHMR) {
            // use map ?
            (<any>globalThis).fuseboxHMR = {};
        }
    }
}

/**
 * helper decorator, need something that calls us every time after hmr runs so we get the new class instance
 */
export function customElement(elementName: string, extended?: ElementDefinitionOptions) {
    return function reg(elementClass: Function) {
        elementCache.setElement(elementName, elementClass);

        if (!customElements.get(elementName)) {
            if (extended) {
                customElements.define(elementName, elementClass, extended);
            } else {
                customElements.define(elementName, elementClass);
            }
        }
    };
}

// https://developer.mozilla.org/en-US/docs/Web/API/CustomElementRegistry
// override define
const define = CustomElementRegistry.prototype.define;
CustomElementRegistry.prototype.define = function(
    elementName: string,
    constructor: any,
    options: object
) {
    const getCurrentElement = () => {
        return elementCache.getElement(elementName);
    };

    // generic abstract web component class
    // implements the standard interface and calls
    // the respective current implementation
    const shallowClass = class extends HTMLElement {
        static get observedAttributes() {
            const el = getCurrentElement();

            // might not have been implemented
            if (el.prototype.observedAttributes) {
                return el.prototype.observedAttributes.apply(this, arguments);
            }
            return [];
        }

        connectedCallback() {
            return getCurrentElement().prototype.connectedCallback.apply(this, arguments);
        }

        disconnectedCallback() {
            return getCurrentElement().prototype.disconnectedCallback.apply(this, arguments);
        }

        adoptedCallback() {
            return getCurrentElement().prototype.disconnectedCallback.apply(this, arguments);
        }

        attributeChangedCallback() {
            return getCurrentElement().prototype.attributeChangedCallback.apply(this, arguments);
        }
    };

    // wrap constructor in proxy
    const proxyElement = new Proxy(shallowClass, {
        construct: function(element, args, _options) {
            // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Reflect/construct
            // new element(element, args, _options);
            return Reflect.construct(getCurrentElement(), args, _options);
        },
        get: function(target, prop, receiver) {
            //@ts-ignore
            return Reflect.get(...arguments);
        },
        apply: function(target, prop, receiver) {
            //@ts-ignore
            return Reflect.apply(...arguments);
        }
    });
    return define.apply(this, [elementName, proxyElement, options]);
};
