export function patch(recentImpl: any, targetImpl: any, BLACKLISTED_PATCH_METHODS: string[]) {
    const ownPropertyNamesProto = Object.getOwnPropertyNames(recentImpl);
    const whitelistedPrototypePropertyNamesProto = ownPropertyNamesProto.filter(
        (propertyName: string) => {
            return BLACKLISTED_PATCH_METHODS.indexOf(propertyName) === -1;
        }
    );

    for (let i = 0; i < whitelistedPrototypePropertyNamesProto.length; i++) {
        const propertyDescriptor = Object.getOwnPropertyDescriptor(
            recentImpl,
            whitelistedPrototypePropertyNamesProto[i]
        );

        if (propertyDescriptor) {
            if (propertyDescriptor.configurable) {
                Object.defineProperty(
                    targetImpl,
                    whitelistedPrototypePropertyNamesProto[i],
                    propertyDescriptor
                );
            } else {
                console.warn(
                    '[custom-element-hmr-polyfill]',
                    `${whitelistedPrototypePropertyNamesProto[i]} is not configurable, skipping`
                );
            }
        }
    }
}
