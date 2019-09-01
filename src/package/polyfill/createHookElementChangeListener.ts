import { CustomElementChangeListener } from './onCustomElementChange';
import { replaceByClone } from '../reflow-strategy/replaceByClone';
import { ReflowStrategy } from './reflowStrategy';
import { rerenderInnerHTML } from '../reflow-strategy/rerenderInnerHTML';

export const createHookElementChangeListener = (
    reflowStrategy: ReflowStrategy = ReflowStrategy.REPLACE_BY_CLONE,
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

        if (reflowStrategy && reflowStrategy !== ReflowStrategy.NONE) {
            elementsChanged.push(elementName);

            clearTimeout(timer);

            timer = setTimeout(() => {
                switch (reflowStrategy) {
                    case ReflowStrategy.REPLACE_BY_CLONE:
                        replaceByClone(elementsChanged);
                        break;

                    case ReflowStrategy.RERENDER_INNER_HTML:
                        rerenderInnerHTML();
                        break;
                }
                elementsChanged = [];
            }, reflowDelayMs);
        }
    };
};
