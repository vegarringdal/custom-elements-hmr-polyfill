export function initCache() {
    if (!(<any>globalThis).hmrCache) {
        (<any>globalThis).hmrCache = {};
        (<any>globalThis).symbolAttributes = {};
        (<any>globalThis).symbolObserver = {};
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
    if (!(<any>globalThis).symbolAttributes[elementName]) {
        (<any>globalThis).symbolAttributes[elementName] = Symbol('observedAttributesArray');
        return (<any>globalThis).symbolAttributes[elementName];
    } else {
        return (<any>globalThis).symbolAttributes[elementName];
    }
}

export function getSymbolObserver(elementName: string) {
    if (!(<any>globalThis).symbolObserver[elementName]) {
        (<any>globalThis).symbolObserver[elementName] = Symbol('observedAttributesObserver');
        return (<any>globalThis).symbolObserver[elementName];
    } else {
        return (<any>globalThis).symbolObserver[elementName];
    }
}
