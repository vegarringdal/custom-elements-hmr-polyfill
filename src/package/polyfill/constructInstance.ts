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
    let proto = mostRecentImpl.__proto__;
    let check: any = null;
    while (proto) {
      check = window[proto.name]
      if (check)
        break;
      proto = proto.__proto__;
    }
    if (check) {
        check = (window[proto.name] as any).prototype instanceof Element;
    }

    if (!check) {
        patch(
            proto.prototype,
            newTarget.prototype,
            BLACKLISTED_PROTOTYPE_PATCH_METHODS
        );
        // here we will update static variables/methods of "__proto__"
        patch(proto, newTarget, BLACKLISTED_STATIC_PATCH_METHODS);
    }

    // PROTOTYPE
    patch(mostRecentImpl.prototype, newTarget.prototype, BLACKLISTED_PROTOTYPE_PATCH_METHODS);

    // here we will update static variables/methods of class
    patch(mostRecentImpl, mostRecentImpl, BLACKLISTED_STATIC_PATCH_METHODS);

    const customElementInstance = Reflect.construct(mostRecentImpl, args, newTarget);

    return customElementInstance;
}
