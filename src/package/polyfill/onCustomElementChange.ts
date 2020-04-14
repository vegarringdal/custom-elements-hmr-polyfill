import { initCache } from './hmrCache';

export type CustomElementChangeListener = (
    elementName: string,
    impl: any,
    options: ElementDefinitionOptions
) => boolean | void;

export const onCustomElementChange = (changeListener: CustomElementChangeListener) => {
    initCache();

    if (!(globalThis as any).hmrCache.onCustomElementChange) {
        (globalThis as any).hmrCache.onCustomElementChange = changeListener;
    }
};
