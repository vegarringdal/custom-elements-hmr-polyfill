abstract class Super extends HTMLElement {
    static awsome = 'wow';
    foo = 'superFoo2';
    connectedCallback() {
        console.log('[SuperExtendElement] connectedCallback -super');
        if ((this as any).render) {
            console.log('render');
            (this as any).render();
        }
    }
}

class SuperElement extends Super {
    connectedCallback() {
        super.connectedCallback();
        console.log('[SuperExtendElement] connectedCallback SuperElement');
    }
}

export class SuperExtendElement extends SuperElement {
    render() {
        console.log('[SuperExtendElement] render');
        this.innerHTML = 'super-extend-element - ' + SuperExtendElement.awsome + ' - ' + this.foo;
    }
}

customElements.define('super-extend-element', SuperExtendElement);
