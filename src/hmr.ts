export function log(target: any, name: any, descriptor: any) {
    const NAME = name;
    const original = descriptor.value;
    if (typeof original === 'function') {
        descriptor.value = function(...args: any) {
            console.log(this.tagName, NAME, 'called');
            try {
                return original.apply(this, args);
            } catch (e) {
                throw e;
            }
        };
    }
    return descriptor;
}
