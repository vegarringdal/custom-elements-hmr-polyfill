import { applyPolyfill, ReflowStrategy } from 'custom-elements-hmr-polyfill';

applyPolyfill(ReflowStrategy.RERENDER_INNER_HTML, 150 /* ms */, (elementName: string) => {
    console.log('[Web Component code change] ', elementName);
});
