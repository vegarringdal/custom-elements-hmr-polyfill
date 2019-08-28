import { getMostRecentImpl } from './hmrCache';

export function createHookClass(elementName: string, originalImpl: any) {
    return class extends originalImpl {
        connectedCallback() {
            const mostRecentImpl = getMostRecentImpl(elementName).prototype;

            const ctx = this;
            const observerOptions = {
                childList: false,
                attributes: true,
                subtree: false
            };

            function callback(mutationList: any[], observer: MutationObserver) {
                mutationList.forEach(mutation => {
                    const mostRecentImpl = getMostRecentImpl(elementName).prototype;
                    const attributes = getMostRecentImpl(elementName).__observedAttributes;

                    if (
                        mostRecentImpl.attributeChangedCallback &&
                        attributes &&
                        attributes.indexOf(mutation.attributeName) !== -1
                    ) {
                        // call back
                        mostRecentImpl.attributeChangedCallback.apply(ctx, [
                            mutation.attributeName,
                            mutation.oldValue,
                            mutation.target.getAttribute(mutation.attributeName)
                        ]);
                    }
                });
            }

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
            (<any>this)._observer = '';

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
