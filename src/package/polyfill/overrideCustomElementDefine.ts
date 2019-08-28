import {
    setMostRecentImpl,
    isCacheInitialized,
    setCacheAsInitialized,
    getMostRecentImpl
} from './hmrCache';
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

            // save and clear attribute so we are in control
            impl.__observedAttributes = impl.observedAttributes;
            Object.defineProperty(impl, 'observedAttributes', {
                get: function() {
                    return [];
                }
            });

            // update cache before proxy since we need it in the createHookClass
            // this will only be a issue when bundle is loaded after body
            setMostRecentImpl(elementName, impl);
            if (!registeredCustomElement) {
                const hookClass = new Proxy(createHookClass(elementName, impl), {
                    construct: function(element, args, newTarget) {
                        const mostRecentImpl = getMostRecentImpl(elementName);
                        return constructInstance(mostRecentImpl, args, newTarget);
                    }
                });
                originalDefineFn.apply(this, [elementName, hookClass, options]);
            } else {
                const onCustomElementChange = (<any>globalThis).hmrCache.onCustomElementChange;

                if (onCustomElementChange && typeof onCustomElementChange === 'function') {
                    onCustomElementChange(elementName, impl, options);
                }
            }
        };
    }
}
