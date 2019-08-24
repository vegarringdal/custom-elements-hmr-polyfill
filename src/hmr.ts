if (document.body) {
    const oldBodyHtml = document.body.innerHTML;
    document.body.innerHTML = '';
    document.body.innerHTML = oldBodyHtml;
}

/**
 * use this to easly stop all messages
 */
export class logger {
    static log(...args: any) {
        console.log(...args);
    }

    static warn(...args: any) {
        console.warn(...args);
    }

    static error(...args: any) {
        console.error(...args);
    }
}

/**
 * simple log decorator so we see what functions are called on classes
 * @param target
 * @param name
 * @param descriptor
 */
export function log(target: any, name: any, descriptor: any) {
    const NAME = name;
    const original = descriptor.value;
    if (typeof original === 'function') {
        descriptor.value = function(...args: any) {
            logger.log(this.tagName, NAME, 'called');
            try {
                return original.apply(this, args);
            } catch (e) {
                throw e;
            }
        };
    }
    return descriptor;
}

/**
 * Simple class to hoold newest instance
 */
export class elementCache {
    static setElement(name: string, elementClass: any) {
        logger.log('setElement', name, 'called');
        this.init();
        (<any>globalThis).fuseboxHMR[name] = elementClass;
    }

    static getElement(name: string) {
        logger.log('getElement', name, 'called');
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
 * helper descorator, need something that calls us everytime after hmr runs so we get the new class instance
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
        } else {
            logger.log('customElement', 'called', 'element was registered');
        }
    };
}

// https://developer.mozilla.org/en-US/docs/Web/API/CustomElementRegistry
// override define
const define = CustomElementRegistry.prototype.define;
CustomElementRegistry.prototype.define = function(name: string, constructor: any, options: object) {
    const elementName = name;
    logger.log(elementName, 'define', 'called');

    // wrap constructor in proxy
    const proxyElement = new Proxy(constructor, {
        construct: function(element, args, _options) {
            logger.log(elementName, 'constructor', 'override-called');

            const newElement = elementCache.getElement(elementName);
            // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Reflect/construct
            // new element(element, args, _options);
            return Reflect.construct(newElement, args, _options);
        },
        get: function(target, prop, receiver) {
            if (
                prop === 'connectedcallback' ||
                prop === 'disconnectedCallback' ||
                prop === 'adoptedCallback' ||
                prop === 'attributeChangedCallback'
            ) {
                const origMethod = target[prop];
                return function(...args: any) {
                    logger.log(elementName, prop, 'override-called');
                    const newElement = elementCache.getElement(elementName);

                    return newElement.prototype[prop];
                };
            } else {
                //@ts-ignore
                return Reflect.get(...arguments);
            }
        }
    });
    return define.apply(this, [name, proxyElement, options]);
};
