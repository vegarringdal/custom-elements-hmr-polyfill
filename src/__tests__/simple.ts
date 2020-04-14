import { applyPolyfill, ReflowStrategy } from '../package/index';

describe('simple test on overriding same element', () => {
    beforeAll(() => {
        // app polyfill
        applyPolyfill(ReflowStrategy.NONE);
    });

    it('First try', (done) => {
        /**
         * Simple custom elemnt
         */
        class MyElement extends HTMLElement {
            connectedCallback() {
                if (this.isConnected) {
                    this.innerHTML = 'I work';
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
            expect(node && node.textContent).toEqual('I work');
            done();
        });
    });

    it('Lets try again', (done) => {
        /**
         * Simple custom elemnt
         */
        class MyElement extends HTMLElement {
            connectedCallback() {
                if (this.isConnected) {
                    this.innerHTML = 'I work also';
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
            expect(node && node.textContent).toEqual('I work also');
            done();
        });
    });

    it('I feel lucky', (done) => {
        /**
         * Simple custom elemnt
         */
        class MyElement extends HTMLElement {
            connectedCallback() {
                if (this.isConnected) {
                    this.innerHTML = 'One million dalla :-O';
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
            expect(node && node.textContent).toEqual('One million dalla :-O');
            done();
        });
    });
});
