export const BLACKLISTED_PATCH_METHODS = [
    'constructor',
    'connectedCallback',
    'disconnectedCallback',
    'adoptedCallback',
    'attributeChangedCallback'
];

export function constructInstance(mostRecentImpl: any, args: any, newTarget: any) {
    // Constructed instance partly points to outdated impl details.
    // This patch loop makes sure that the hook methods aren't overridden,
    // the constructor stays intact but methods, getters, setters and fields
    // are updated according to the most recent implementation:

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
                newTarget.prototype,
                whitelistedPropertyNames[i],
                propertyDescriptor
            );
        }
    }

    const customElementInstance = Reflect.construct(mostRecentImpl, args, newTarget);

    return customElementInstance;
}
