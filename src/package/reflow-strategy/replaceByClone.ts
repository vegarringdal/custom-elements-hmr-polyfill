const recreateNode = (node: Node) => {
    if (node.parentNode) {
        node.parentNode.replaceChild(node.cloneNode(), node);
    }
};

const visit = (node: Node, elementNames?: Array<string> | undefined) => {
    for (let i = 0; i < node.childNodes.length; i++) {
        const childNode = node.childNodes[i];
        let recreatedNode = false;

        // re-creates a node in case of:
        // - no element name filters given
        // - element name filter matches childNode's element name
        if (!elementNames || elementNames.indexOf(childNode.nodeName.toUpperCase()) > -1) {
            recreateNode(childNode);
            recreatedNode = true;
        }

        if (childNode.childNodes && !recreatedNode) {
            visit(childNode, elementNames);
        }
    }
};

export function replaceByClone(elementNameOrNames?: Array<string> | string) {
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
