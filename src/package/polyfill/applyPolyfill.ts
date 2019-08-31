import { initCache } from './hmrCache';
import { overrideCustomElementDefine } from './overrideCustomElementDefine';
import { CustomElementChangeListener, onCustomElementChange } from './onCustomElementChange';
import { createHookElementChangeListener } from './createHookElementChangeListener';

export function applyPolyfill(
    autoReflow: boolean = true,
    reflowDelayMs: number = 250,
    onCustomElementChangeListener?: CustomElementChangeListener
) {
    initCache();
    overrideCustomElementDefine();

    onCustomElementChange(
        createHookElementChangeListener(autoReflow, reflowDelayMs, onCustomElementChangeListener)
    );
}
