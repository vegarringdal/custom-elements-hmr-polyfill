import { getMostRecentImpl } from './hmrCache';

export const BLACKLISTED_PATCH_METHODS = [
    'constructor',
    'connectedCallback',
    'disconnectedCallback',
    'adoptedCallback',
    'attributeChangedCallback'
];

export function constructInstance(elementName: string, args: any, newTarget: any) {
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
}
