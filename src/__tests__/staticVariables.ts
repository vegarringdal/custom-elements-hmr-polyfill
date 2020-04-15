import { applyPolyfill, ReflowStrategy } from '../package/index';

let callbackResult = '';

describe('static variables', () => {
    beforeAll(() => {
        // app polyfill
        applyPolyfill(ReflowStrategy.RERENDER_INNER_HTML, 10, (element: string) => {
            callbackResult = element;
        });
    });

    beforeEach(() => {
        // clear callback
        callbackResult = '';
    });

    it('First try', (done) => {
        /**
         * Simple custom elemnt
         */
        class MyElement extends HTMLElement {
            static test = 'my static variable';
            connectedCallback() {
                if (this.isConnected) {
                    this.innerHTML = (this.constructor as any).test;
                }
            }
        }

        /**
         * define element and add it to body
         * if polyfill does nopt work it will then fail here
         */
        customElements.define('app-root', MyElement);
        document.body.innerHTML = '<app-root id="my-element"></app-root>';

        /**
         * wait for render and check if value is set
         */
        requestAnimationFrame(() => {
            const node = document.getElementById('my-element');
            expect(node && node.textContent).toEqual('my static variable');
            expect(callbackResult).toEqual('');
            customElements.define('app-root', MyElement);
            setTimeout(() => {
                expect(callbackResult).toEqual('app-root');
                done();
            }, 50);
        });
    });

    it('edit static', (done) => {
        /**
         * Simple custom elemnt
         */
        class MyElement extends HTMLElement {
            static test = 'changed';
            connectedCallback() {
                if (this.isConnected) {
                    this.innerHTML = (this.constructor as any).test;
                }
            }
        }

        /**
         * define element and add it to body
         * if polyfill does nopt work it will then fail here
         */
        expect(callbackResult).toEqual('');
        customElements.define('app-root', MyElement);
        document.body.innerHTML = '<app-root id="my-element"></app-root>';

        /**
         * wait for render and check if value is set
         */
        requestAnimationFrame(() => {
            const node = document.getElementById('my-element');
            expect(node && node.textContent).toEqual('changed');
            expect(callbackResult).toEqual('app-root');
            customElements.define('app-root', MyElement);
            done();
        });
    });
});
