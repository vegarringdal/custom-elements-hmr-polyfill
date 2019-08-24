import { customElement, log, logger } from './hmr';

@customElement('app-root')
export class ElementX extends HTMLElement {
    constructor() {
        logger.log('app-root', 'constructor', '.....................................'); // I can be edited
        super();
    }

    @log
    connectedCallback() {
        logger.log(' I can not be edited !!! why is that ?');
        this.innerHTML = /*html*/ `
            <ul>
                <my-comp name="1"></my-comp>
                <my-comp name="2"></my-comp>
            </ul>
        `;
    }

    @log
    disconnectedCallback() {}

    @log
    adoptedCallback() {}

    @log
    attributeChangedCallback() {}
}
