/* eslint-disable prefer-rest-params */
import { getMostRecentImpl, getSymbolAttributes, getSymbolObserver } from './hmrCache';

export function createHookClass(elementName: string, originalImpl: any) {
    return class extends originalImpl {
        static get observedAttributes() {
            return [];
        }

        connectedCallback() {
            const Impl = getMostRecentImpl(elementName);
            const mostRecentImpl = Impl.prototype;
            const attributes: string[] = Impl[getSymbolAttributes(elementName)];

            const observerOptions = {
                childList: false,
                attributes: true,
                attributeOldValue: true,
                subtree: false
            };

            const callback = (mutationList: any[]) => {
                mutationList.forEach((mutation) => {
                    if (
                        mostRecentImpl.attributeChangedCallback &&
                        attributes &&
                        attributes.indexOf(mutation.attributeName) !== -1
                    ) {
                        // call back
                        mostRecentImpl.attributeChangedCallback.apply(this, [
                            mutation.attributeName,
                            mutation.oldValue,
                            this.getAttribute(mutation.attributeName),
                            null
                        ]);
                    }
                });
            };

            // call initial callback when class is created
            if (attributes) {
                if (Array.isArray(attributes)) {
                    attributes.forEach((attributeName) => {
                        const haveAtt = this.getAttributeNode(attributeName);
                        if (haveAtt) {
                            mostRecentImpl.attributeChangedCallback.apply(this, [
                                attributeName,
                                null,
                                this.getAttribute(attributeName),
                                null
                            ]);
                        }
                    });
                } else {
                    console.warn(`observedAttributes in ${elementName} is not array, please fix`);
                }
            }

            // create and observe
            (this as any)[getSymbolObserver(elementName)] = new MutationObserver(callback);
            (this as any)[getSymbolObserver(elementName)].observe(
                (this as unknown) as Node,
                observerOptions
            );

            if (mostRecentImpl.connectedCallback) {
                mostRecentImpl.connectedCallback.apply(this, arguments);
            }
        }

        disconnectedCallback() {
            // cleanup
            (this as any)[getSymbolObserver(elementName)].disconnect();
            (this as any)[getSymbolObserver(elementName)] = null;

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
