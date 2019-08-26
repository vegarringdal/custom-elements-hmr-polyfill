import { applyPolyfill, reflowDOM, onCustomElementChange } from 'custom-elements-hmr-polyfill';

// apply polly fill
applyPolyfill();

let awaiter: any;

// listen for code changes
onCustomElementChange((elementName: string, impl: any, options: ElementDefinitionOptions) => {
    console.log('Detected a code change for custom element', elementName);

    // most simple buffering algorithm, all reg. callbacks get cleared until one is the last one > 250ms
    clearTimeout(awaiter);

    awaiter = setTimeout(() => {
        console.log('[Buffered reflow] Re-flowing DOM to activate updated custom elements code.');

        // reflow the DOM to re-create all elements (thus replacing elements and execute the new code)
        // TODO: This could be improved by only replacing nodes matching the elementName that changed
        reflowDOM();
    }, 250 /* essential buffer time*/);
});
