import { CustomElementChangeListener } from './onCustomElementChange';
import { reflowDOM } from '../utils/reflowDOM';

export const createHookElementChangeListener = (
    autoReflow: boolean = true,
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

        if (autoReflow) {
            elementsChanged.push(elementName);

            clearTimeout(timer);

            setTimeout(() => {
                reflowDOM(elementsChanged);

                elementsChanged = [];
            }, reflowDelayMs);
        }
    };
};
