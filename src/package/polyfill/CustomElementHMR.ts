const BLACKLISTED_PATCH_METHODS = [
    'constructor',
    'connectedCallback',
    'disconnectedCallback',
    'adoptedCallback',
    'attributeChangedCallback'
];

const initCache = () => {
    if (!(<any>globalThis).fuseboxHMR) {
        (<any>globalThis).fuseboxHMR = {};
    }
};

const getMostRecentImpl = (elementName: string) => {
    return (<any>globalThis).fuseboxHMR[elementName];
};

const setMostRecentImpl = (elementName: string, impl: any) => {
    (<any>globalThis).fuseboxHMR[elementName] = impl;
};

const createHookClass = (elementName: string, originalImpl: any) => {
    return class extends originalImpl {
        static get observedAttributes() {
            return super.observedAttributes;
        }

        connectedCallback() {
            const mostRecentImpl = getMostRecentImpl(elementName).prototype;
            if (mostRecentImpl.connectedCallback) {
                mostRecentImpl.connectedCallback.apply(this, arguments);
            }
        }

        disconnectedCallback() {
            const mostRecentImpl = getMostRecentImpl(elementName).prototype;
            if (mostRecentImpl.disconnectedCallback) {
                mostRecentImpl.disconnectedCallback.apply(this, arguments);
            }
        }

        adoptedCallback() {
            const mostRecentImpl = getMostRecentImpl(elementName).prototype;
            if (mostRecentImpl.adoptedCallback) {
                mostRecentImpl.adoptedCallback.apply(this, arguments);
            }
        }

        attributeChangedCallback() {
            const mostRecentImpl = getMostRecentImpl(elementName).prototype;
            if (mostRecentImpl.attributeChangedCallback) {
                mostRecentImpl.attributeChangedCallback.apply(this, arguments);
            }
        }
    };
};

const constructInstance = (elementName: string, args: any, newTarget: any) => {
    const mostRecentImpl = getMostRecentImpl(elementName);

    // Constructed instance partly points to outdated impl details.
    // This patch loop makes sure that the hook methods aren't overridden,
    // the constructor stays intact but methods, getters, setters and fields
    // are updated according to the most recent implementation:
    const customElementInstance = Reflect.construct(mostRecentImpl, args, newTarget);
    const ownPropertyNames = Object.getOwnPropertyNames(mostRecentImpl.prototype);

    const whitelistedPropertyNames = ownPropertyNames.filter((propertyName: string) => {
        return BLACKLISTED_PATCH_METHODS.indexOf(propertyName) === -1;
    });

    for (let i = 0; i < whitelistedPropertyNames.length; i++) {
        const propertyDescriptor = Object.getOwnPropertyDescriptor(
            mostRecentImpl.prototype,
            whitelistedPropertyNames[i]
        );

        if (propertyDescriptor) {
            Object.defineProperty(
                customElementInstance,
                whitelistedPropertyNames[i],
                propertyDescriptor
            );
        }
    }
    return customElementInstance;
};

const overrideCustomElementDefine = () => {
    if (!(<any>globalThis).fuseboxHMR.initialized) {
        // make sure the override happens only once
        (<any>globalThis).fuseboxHMR.initialized = true;

        const originalDefineFn = CustomElementRegistry.prototype.define;

        CustomElementRegistry.prototype.define = function(
            elementName: string,
            impl: any,
            options: ElementDefinitionOptions
        ) {
            const registeredCustomElement = customElements.get(elementName);

            if (!registeredCustomElement) {
                const hookClass = new Proxy(createHookClass(elementName, impl), {
                    construct: function(element, args, newTarget) {
                        return constructInstance(elementName, args, newTarget);
                    }
                });
                originalDefineFn.apply(this, [elementName, hookClass, options]);
            }
            setMostRecentImpl(elementName, impl);
        };
    }
};

export function applyPolyfill() {
    initCache();
    overrideCustomElementDefine();
}
