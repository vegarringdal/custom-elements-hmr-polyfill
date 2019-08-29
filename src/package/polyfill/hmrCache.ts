export function initCache() {
    if (!(<any>globalThis).hmrCache) {
        (<any>globalThis).hmrCache = {};
        (<any>globalThis).hmrSymbol = {};
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

export function getSymbol(elementName: string) {
    if (!(<any>globalThis).hmrSymbol[elementName]) {
        (<any>globalThis).hmrSymbol[elementName] = Symbol('observedAttributes');
        return (<any>globalThis).hmrSymbol[elementName];
    } else {
        return (<any>globalThis).hmrSymbol[elementName];
    }
}
