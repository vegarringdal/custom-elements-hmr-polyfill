export const BLACKLISTED_PROTOTYPE_PATCH_METHODS = [
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

    const prototypePropertyNames = Object.getOwnPropertyNames(mostRecentImpl.prototype);

    const whitelistedPrototypePropertyNames = prototypePropertyNames.filter(
        (propertyName: string) => {
            return BLACKLISTED_PROTOTYPE_PATCH_METHODS.indexOf(propertyName) === -1;
        }
    );

    for (let i = 0; i < whitelistedPrototypePropertyNames.length; i++) {
        const propertyDescriptor = Object.getOwnPropertyDescriptor(
            mostRecentImpl.prototype,
            whitelistedPrototypePropertyNames[i]
        );

        if (propertyDescriptor) {
            if (propertyDescriptor.configurable) {
                Object.defineProperty(
                    newTarget.prototype,
                    whitelistedPrototypePropertyNames[i],
                    propertyDescriptor
                );
            } else {
                console.warn(
                    '[custom-element-hmr-polyfill]',
                    `${whitelistedPrototypePropertyNames[i]} is not configurable, skipping`
                );
            }
        }
    }

    // here we will update static variables/methods

    const ownPropertyNames = Object.getOwnPropertyNames(mostRecentImpl);

    const whitelistedPropertyNames = ownPropertyNames.filter((propertyName: string) => {
        return ['name', 'prototype', 'length'].indexOf(propertyName) === -1;
    });

    for (let i = 0; i < whitelistedPropertyNames.length; i++) {
        const propertyDescriptor = Object.getOwnPropertyDescriptor(
            mostRecentImpl,
            whitelistedPropertyNames[i]
        );

        if (propertyDescriptor) {
            if (propertyDescriptor.configurable) {
                Object.defineProperty(newTarget, whitelistedPropertyNames[i], propertyDescriptor);
            } else {
                console.warn(
                    '[custom-element-hmr-polyfill]',
                    `${whitelistedPropertyNames[i]} is not configurable, skipping`
                );
            }
        }
    }

    const customElementInstance = Reflect.construct(mostRecentImpl, args, newTarget);

    return customElementInstance;
}
