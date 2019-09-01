export function initCache() {
    if (!(<any>globalThis).hmrCache) {
        (<any>globalThis).hmrCache = {};
        (<any>globalThis).hmrCacheSymbolAttributes = {};
        (<any>globalThis).hmrCacheSymbolObserver = {};
    }
}

export function getMostRecentImpl(elementName: string) {
    return (<any>globalThis).hmrCache[elementName];
}

export function setMostRecentImpl(elementName: string, impl: any) {
    (<any>globalThis).hmrCache[elementName] = impl;
}

export function isCacheInitialized() {
    return (<any>globalThis).hmrCache.initialized;
}

export function setCacheAsInitialized() {
    (<any>globalThis).hmrCache.initialized = true;
}

export function getSymbolAttributes(elementName: string) {
    if (!(<any>globalThis).hmrCacheSymbolAttributes[elementName]) {
        (<any>globalThis).hmrCacheSymbolAttributes[elementName] = Symbol('observedAttributesArray');
        return (<any>globalThis).hmrCacheSymbolAttributes[elementName];
    } else {
        return (<any>globalThis).hmrCacheSymbolAttributes[elementName];
    }
}

export function getSymbolObserver(elementName: string) {
    if (!(<any>globalThis).hmrCacheSymbolObserver[elementName]) {
        (<any>globalThis).hmrCacheSymbolObserver[elementName] = Symbol(
            'observedAttributesObserver'
        );
        return (<any>globalThis).hmrCacheSymbolObserver[elementName];
    } else {
        return (<any>globalThis).hmrCacheSymbolObserver[elementName];
    }
}
