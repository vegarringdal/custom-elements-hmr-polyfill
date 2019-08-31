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

### Most simple integration

```ts
import { applyPolyfill, ReflowStrategy } from 'custom-elements-hmr-polyfill';

// to auto-reflow on changes, buffered, all 250ms, just run
applyPolyfill();
```

As you can see, the `autoReflow` can be buffered as well by setting `reflowBufferMs` in milliseconds. 
The idea behind this is to limit the amount of DOM traversals and reflows when multiple re-definitions happen in a short timeframe (typical HMR use-case).

### Configure buffering to limit the amount of re-rendering

```ts
import { applyPolyfill, ReflowStrategy } from 'custom-elements-hmr-polyfill';

// if you want to customize...
applyPolyfill(
    // replaces matching web component elements with a new clone of the previous element
    // and calls all lifecycle methods like the web standard suggests (default)
    ReflowStrategy.REPLACE_BY_CLONE,
    /* buffers changes for 500ms */ 500, 
    /* gets called for every re-definition of a web component */
    (elementName: string, impl: any, options: ElementDefinitionOptions) => {

        console.log('[Web Component code change] ', elementName, impl, options);
    }    
);
```
### Change the reflow strategy

```ts
import { applyPolyfill, ReflowStrategy } from 'custom-elements-hmr-polyfill';

// if you want to customize...
applyPolyfill(
    // resets the body's innerHTML, thus rerenders all elements
    // but doesn't call all lifecycle methods in a standard way (less calls)
    ReflowStrategy.RERENDER_INNER_HTML,
    /* buffers changes for 100ms */ 100, 
    /* gets called for every re-definition of a web component */
    (elementName: string, impl: any, options: ElementDefinitionOptions) => {

        console.log('[Web Component code change] ', elementName, impl, options);
    }    
);
```

### Use a custom re-render strategy

```ts
import { applyPolyfill, ReflowStrategy, reflowInnerHTML } from 'custom-elements-hmr-polyfill';

// if you want to customize...
applyPolyfill(
    /* no reflowing */ ReflowStrategy.NONE,
    /* ignored, because reflowing is disabled */ -1, 
    /* gets called for every re-definition of a web component */
    (elementName: string, impl: any, options: ElementDefinitionOptions) => {

        // manually reflow using reflowInnerHTML strategy without any buffering
        reflowInnerHTML();

        console.log('And do something more...');
    }    
);
```

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