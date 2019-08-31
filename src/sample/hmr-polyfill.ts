import { applyPolyfill, ReflowStrategy } from 'custom-elements-hmr-polyfill';

applyPolyfill(ReflowStrategy.REPLACE_BY_CLONE, 150 /* ms */, (elementName: string) => {
    console.log('[Web Component code change] ', elementName);
});
