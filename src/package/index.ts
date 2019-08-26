import { initCache } from './polyfill/hmrCache';
import { overrideCustomElementDefine } from './polyfill/overrideCustomElementDefine';
export { clearDOM } from './utils/clearDOM';
export { defineCustomElement } from './decorator/defineCustomElement';

export function applyPolyfill() {
    initCache();
    overrideCustomElementDefine();
}
