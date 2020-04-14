import { applyPolyfill, ReflowStrategy } from '../package/index';

describe('test disconnectedCallback', () => {
    beforeAll(() => {
        // app polyfill
        applyPolyfill(ReflowStrategy.NONE);
    });

    it('First try', (done) => {
        let disconnectedValue = 'none';
        /**
         * Simple custom elemnt
         */
        class MyElement extends HTMLElement {
            connectedCallback() {
                if (this.isConnected) {
                    this.innerHTML = 'I work';
                }
            }

            disconnectedCallback() {
                disconnectedValue = 'yay, it works';
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
            expect(disconnectedValue).toEqual('none');
            document.body.innerHTML = '';
            requestAnimationFrame(() => {
                expect(disconnectedValue).toEqual('yay, it works');

                done();
            });
        });
    });

    it('remove disconnected callback', (done) => {
        let disconnectedValue = 'none';
        /**
         * Simple custom elemnt
         */
        class MyElement extends HTMLElement {
            connectedCallback() {
                if (this.isConnected) {
                    this.innerHTML = 'I work';
                }
            }

            disconnectedCallback() {
                disconnectedValue = 'yay, it works again';
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
            expect(disconnectedValue).toEqual('none');
            document.body.innerHTML = '';
            requestAnimationFrame(() => {
                expect(disconnectedValue).toEqual('yay, it works again');

                done();
            });
        });
    });

    it('add back disconnected callback', (done) => {
        const disconnectedValue = 'none';
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
            expect(disconnectedValue).toEqual('none');
            document.body.innerHTML = '';
            requestAnimationFrame(() => {
                expect(disconnectedValue).toEqual('none');

                done();
            });
        });
    });
});
