# custom-elements-hmr-polyfill
> 100% standard-compliant polyfill to allow WebComponent re-definition at runtime (used for HMR) 

At the time of the creation of this readme, the API `customElements.define(...)` doesn't allow to re-define a Web Component with the same tag name but a different implementation. This limitation [made it impossible to do Hot Module Replacement (HMR) with standard Web Components](https://github.com/w3c/webcomponents/issues/829). - until today. 

## Live Demo

- [Codesandbox](https://codesandbox.io/s/custom-elements-hmr-polyfill-4vd3o)

## How to install?

- `npm install custom-elements-hmr-polyfill`

## What does it do?

This polyfill overrides the native browser API `customElement.define` and enables re-definition of Web Components at runtime.

Once a Web Component gets re-defined, the DOM tree is traversed and all instances of the Web Component are automatically cloned and re-created. Optionally, the  `onCustomElementChange` callback is called to give you full control over the runtime behaviour in case of any Web Component re-definition:

```ts
import { applyPolyfill } from 'custom-elements-hmr-polyfill';

// to auto-reflow on changes, buffered, all 250ms, just run
applyPolyfill();

// if you want to customize...
applyPolyfill(
    /* enable autoReflow */  true, 
    /* buffer changes for 150ms */ 150, 
    /* called for every web component code change (no buffer) */ 
    (elementName: string, impl: any, options: ElementDefinitionOptions) => {

        console.log('[Web Component code change] ', elementName, impl, options);
    }    
);
```

As you can see, the `autoReflow` can be buffered as well by setting `reflowBufferMs` in milliseconds. 
The idea behind this is to limit the amount of DOM traversals and reflows when multiple re-definitions happen in a short timeframe (typical HMR use-case).

## Browser Support

This polyfill requires support of the following browser API's (natively or polyfilled).
- `Proxy`
- `MutationObserver`
- `customElements`

Polyfills for these API's must be applied *before* you apply this polyfill.

## Limitations

None. This polyfill is 100% web standard compliant. 

The previously existing limitation of `observedAttributes` being immutable has been polyfilled using a `MutationObserver` lately. 

For reference see: [W3C/WhatWG standard limitation of Web Component re-definition](https://github.com/w3c/webcomponents/issues/829).

## Advanced: How to start the sample code (of this repo)?

- `npm run bootstrap`
- `npm start`

## How to build a dist version of this polyfill?

- `npm build`