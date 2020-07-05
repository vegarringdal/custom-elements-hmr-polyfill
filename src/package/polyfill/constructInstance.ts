import { patch } from './patch';
export const BLACKLISTED_PROTOTYPE_PATCH_METHODS = [
    /*
    // we dont need these anymore...
    'constructor',
    'connectedCallback',
    'disconnectedCallback',
    'adoptedCallback',
    'attributeChangedCallback'  */
];

export const BLACKLISTED_STATIC_PATCH_METHODS = ['name', 'prototype', 'length'];

export function constructInstance(mostRecentImpl: any, args: any, newTarget: any) {
    // Constructed instance points to outdated impl details.

    // PROTO check
    let check: any = window[mostRecentImpl.__proto__.name];
    if (check) {
        check = (window[mostRecentImpl.__proto__.name] as any).prototype instanceof Element;
    }

    if (!check) {
        let proto = mostRecentImpl.__proto__;
        let base: any = null;
        while (proto) {
            if ((window[proto?.__proto__?.name] as any)?.prototype instanceof Element) {
                // if parent is instance of Element then we want it...
                base = proto;
            }
            if (base) {
                break;
            }
            proto = proto.__proto__;
        }
        if (base.HMR_PATCH_PROTOTYPE) {
            patch(base.prototype, newTarget.prototype, BLACKLISTED_PROTOTYPE_PATCH_METHODS);
            // here we will update static variables/methods of "__proto__"
            patch(base, newTarget, BLACKLISTED_STATIC_PATCH_METHODS);
        }
    }

    // PROTOTYPE
    patch(mostRecentImpl.prototype, newTarget.prototype, BLACKLISTED_PROTOTYPE_PATCH_METHODS);

    // here we will update static variables/methods of class
    patch(mostRecentImpl, mostRecentImpl, BLACKLISTED_STATIC_PATCH_METHODS);

    const customElementInstance = Reflect.construct(mostRecentImpl, args, newTarget);

    return customElementInstance;
}
