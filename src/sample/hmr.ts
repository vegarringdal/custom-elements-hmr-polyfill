import { applyPolyfill } from 'custom-elements-hmr-polyfill';

applyPolyfill(
    /* enable autoReflow */ true,
    /* buffer changes for 150ms */ 150,
    /* called for every web component code change (ignores the buffer) */

    (elementName: string, impl: any, options: ElementDefinitionOptions) => {
        console.log('[Web Component code change] ', elementName, impl, options);
    }
);
