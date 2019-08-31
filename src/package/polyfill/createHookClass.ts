import { getMostRecentImpl, getSymbolAttributes, getSymbolObserver } from './hmrCache';

export function createHookClass(elementName: string, originalImpl: any) {
    return class extends originalImpl {
        static get observedAttributes() {
            return [];
        }

        connectedCallback() {
            const mostRecentImpl = getMostRecentImpl(elementName).prototype;

            const observerOptions = {
                childList: false,
                attributes: true,
                subtree: false
            };

            const callback = (mutationList: any[], observer: MutationObserver) => {
                mutationList.forEach(mutation => {
                    const Impl = getMostRecentImpl(elementName);
                    const ImplProto = Impl.prototype;
                    const attributes = Impl[getSymbolAttributes(elementName)];

                    if (
                        ImplProto.attributeChangedCallback &&
                        attributes &&
                        attributes.indexOf(mutation.attributeName) !== -1
                    ) {
                        // call back
                        ImplProto.attributeChangedCallback.apply(this, [
                            mutation.attributeName,
                            mutation.oldValue,
                            mutation.target.getAttribute(mutation.attributeName)
                        ]);
                    }
                });
            };

            // create and observe
            (<any>this)[getSymbolObserver(elementName)] = new MutationObserver(callback);
            (<any>this)[getSymbolObserver(elementName)].observe(
                (this as unknown) as Node,
                observerOptions
            );

            if (mostRecentImpl.connectedCallback) {
                mostRecentImpl.connectedCallback.apply(this, arguments);
            }
        }

        disconnectedCallback() {
            // cleanup
            (<any>this)[getSymbolObserver(elementName)].disconnect();
            (<any>this)[getSymbolObserver(elementName)] = null;

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
    };
}
