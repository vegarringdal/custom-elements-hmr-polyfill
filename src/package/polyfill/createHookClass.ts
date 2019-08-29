import { getMostRecentImpl, getSymbol } from './hmrCache';

export function createHookClass(elementName: string, originalImpl: any) {
    return class extends originalImpl {
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
                    const attributes = Impl[getSymbol(elementName)];

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
            (<any>this)._observer = new MutationObserver(callback);
            (<any>this)._observer.observe((this as unknown) as Node, observerOptions);

            if (mostRecentImpl.connectedCallback) {
                mostRecentImpl.connectedCallback.apply(this, arguments);
            }
        }

        disconnectedCallback() {
            // cleanup
            (<any>this)._observer.disconnect();
            (<any>this)._observer = null;

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
