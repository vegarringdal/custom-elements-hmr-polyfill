import { initCache } from './hmrCache';

export type CustomElementChangeListener = (
    elementName: string,
    impl: any,
    options: ElementDefinitionOptions
) => void;

export const onCustomElementChange = (changeListener: CustomElementChangeListener) => {
    initCache();

    if (!(<any>globalThis).hmrCache.onCustomElementChange) {
        (<any>globalThis).hmrCache.onCustomElementChange = changeListener;
    }
};
