export function initCache() {
    if (!(globalThis as any).hmrCache) {
        (globalThis as any).hmrCache = {};
        (globalThis as any).hmrCacheSymbolAttributes = {};
        (globalThis as any).hmrCacheSymbolObserver = {};
    }
}

export function getMostRecentImpl(elementName: string) {
    return (globalThis as any).hmrCache[elementName];
}

export function setMostRecentImpl(elementName: string, impl: any) {
    (globalThis as any).hmrCache[elementName] = impl;
}

export function isCacheInitialized() {
    return (globalThis as any).hmrCache.initialized;
}

export function setCacheAsInitialized() {
    (globalThis as any).hmrCache.initialized = true;
}

export function getSymbolAttributes(elementName: string) {
    if (!(globalThis as any).hmrCacheSymbolAttributes[elementName]) {
        (globalThis as any).hmrCacheSymbolAttributes[elementName] =
            Symbol('observedAttributesArray');
        return (globalThis as any).hmrCacheSymbolAttributes[elementName];
    } else {
        return (globalThis as any).hmrCacheSymbolAttributes[elementName];
    }
}

export function getSymbolObserver(elementName: string) {
    if (!(globalThis as any).hmrCacheSymbolObserver[elementName]) {
        (globalThis as any).hmrCacheSymbolObserver[elementName] = Symbol(
            'observedAttributesObserver'
        );
        return (globalThis as any).hmrCacheSymbolObserver[elementName];
    } else {
        return (globalThis as any).hmrCacheSymbolObserver[elementName];
    }
}
