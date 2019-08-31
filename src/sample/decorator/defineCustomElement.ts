export function defineCustomElement(
    elementName: string,
    elementDefinitionOptions?: ElementDefinitionOptions
) {
    return function reg(impl: any) {
        if (elementDefinitionOptions) {
            customElements.define(elementName, impl, elementDefinitionOptions);
        } else {
            customElements.define(elementName, impl);
        }
    };
}
