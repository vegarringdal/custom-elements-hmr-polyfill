const recreateNode = (node: Node) => {
    if (node.parentNode) {
        node.parentNode.replaceChild(node.cloneNode(true), node);
    }
};

const visit = (node: Node, elementNames?: Array<string> | undefined) => {
    for (let i = 0; i < node.childNodes.length; i++) {
        const childNode = node.childNodes[i];

        // re-creates a node in case of:
        // - no element name filters given
        // - element name filter matches childNode's element name
        if (!elementNames || elementNames.indexOf(childNode.nodeName.toUpperCase()) > -1) {
            console.log('Re-creating DOM node', elementNames);
            recreateNode(childNode);
        }

        if (childNode.childNodes) {
            visit(childNode, elementNames);
        }
    }
};

export function reflowDOM(elementNameOrNames?: Array<string> | string) {
    if (document.body) {
        let elementNames: Array<string> | undefined =
            typeof elementNameOrNames == 'string' && typeof elementNameOrNames != 'undefined'
                ? [elementNameOrNames]
                : elementNameOrNames;

        if (elementNames) {
            // automatic uppercase transformation ahead of comparison time
            elementNames = elementNames.map(elementName => elementName.toUpperCase());
        }

        requestAnimationFrame(() => {
            visit(document.body, elementNames);
        });
    }
}
