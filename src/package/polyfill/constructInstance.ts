import { patch } from './patch';
export const BLACKLISTED_PROTOTYPE_PATCH_METHODS = [
    'constructor',
    'connectedCallback',
    'disconnectedCallback',
    'adoptedCallback',
    'attributeChangedCallback'
];

export const BLACKLISTED_STATIC_PATCH_METHODS = ['name', 'prototype', 'length'];

export function constructInstance(mostRecentImpl: any, args: any, newTarget: any) {
    // Constructed instance partly points to outdated impl details.
    // This patch loop makes sure that the hook methods aren't overridden,
    // the constructor stays intact but methods, getters, setters and fields
    // are updated according to the most recent implementation:

    // PROTO check
    let check: any = window[mostRecentImpl.__proto__.name];
    if (check) {
        check = (window[mostRecentImpl.__proto__.name] as any).prototype instanceof Element;
    }

    if (!check) {
        patch(
            mostRecentImpl.__proto__.prototype,
            newTarget.prototype,
            BLACKLISTED_PROTOTYPE_PATCH_METHODS
        );
        // here we will update static variables/methods of "__proto__"
        patch(mostRecentImpl.__proto__, newTarget, BLACKLISTED_STATIC_PATCH_METHODS);
    }

    // PROTOTYPE
    patch(mostRecentImpl.prototype, newTarget.prototype, BLACKLISTED_PROTOTYPE_PATCH_METHODS);

    // here we will update static variables/methods of class
    patch(mostRecentImpl, mostRecentImpl, BLACKLISTED_STATIC_PATCH_METHODS);

    const customElementInstance = Reflect.construct(mostRecentImpl, args, newTarget);

    return customElementInstance;
}
