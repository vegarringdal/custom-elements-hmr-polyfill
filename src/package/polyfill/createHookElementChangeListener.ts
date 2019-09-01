import { CustomElementChangeListener } from './onCustomElementChange';
import { ReflowStrategy } from './reflowStrategy';
import { rerenderInnerHTML } from '../reflow-strategy/rerenderInnerHTML';

export const createHookElementChangeListener = (
    reflowStrategy: ReflowStrategy = ReflowStrategy.RERENDER_INNER_HTML,
    reflowDelayMs: number = 250,
    onCustomElementChangeListener?: CustomElementChangeListener
): CustomElementChangeListener => {
    let timer: any;
    let elementsChanged: Array<string> = [];

    if (!onCustomElementChangeListener) {
        onCustomElementChangeListener = () => {};
    }

    return (elementName: string, impl: any, options: ElementDefinitionOptions) => {
        onCustomElementChangeListener!(elementName, impl, options);

        if (reflowStrategy && reflowStrategy === ReflowStrategy.RERENDER_INNER_HTML) {
            elementsChanged.push(elementName);

            clearTimeout(timer);

            timer = setTimeout(() => {
                rerenderInnerHTML();
                elementsChanged = [];
            }, reflowDelayMs);
        }
    };
};
