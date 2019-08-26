import { setMostRecentImpl, isCacheInitialized, setCacheAsInitialized } from './hmrCache';
import { createHookClass } from './createHookClass';
import { constructInstance } from './constructInstance';

export function overrideCustomElementDefine() {
    if (!isCacheInitialized()) {
        // make sure the override happens only once
        setCacheAsInitialized();

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
}
