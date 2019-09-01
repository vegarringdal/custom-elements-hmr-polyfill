import { initCache } from './hmrCache';
import { overrideCustomElementDefine } from './overrideCustomElementDefine';
import { CustomElementChangeListener, onCustomElementChange } from './onCustomElementChange';
import { createHookElementChangeListener } from './createHookElementChangeListener';
import { ReflowStrategy } from './reflowStrategy';

export function applyPolyfill(
    reflowStrategy: ReflowStrategy = ReflowStrategy.RERENDER_INNER_HTML,
    reflowDelayMs: number = 250,
    onCustomElementChangeListener?: CustomElementChangeListener
) {
    initCache();
    overrideCustomElementDefine();

    onCustomElementChange(
        createHookElementChangeListener(
            reflowStrategy,
            reflowDelayMs,
            onCustomElementChangeListener
        )
    );
}
