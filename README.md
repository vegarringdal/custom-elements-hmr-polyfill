# custom-elements-hmr-polyfill
Custom Element HMR polyfill

[Live Codesandbox](https://codesandbox.io/s/custom-elements-hmr-polyfill-4vd3o)

## How to start sample:
* `npm install`
* `npm start`

## How to build:
* `npm build`

## How to use:

The limitation is `observedAttributes`. 

If the code of a custom element changes and returns different attribute names to observe, this change is not reflected.

---

#### Sample 1:

Add `hmr.ts` file to you project.

This needs to run before everything else.

> hmr.ts

```ts
import { applyPolyfill, reflowDOM, onCustomElementChange } from 'custom-elements-hmr-polyfill';

// apply polly fill
applyPolyfill();

// reflow page (will clear window.body and put html back)
reflowDOM();

// listen for code changes
onCustomElementChange((elementName: string, impl: any, options: ElementDefinitionOptions) => {
    console.log('Detected a code change for custom element', elementName);
});

```
---

#### Sample 2:

Add `hmr.ts` file to you project.

This needs to run before everything else.

> hmr.ts

```js
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
```