import { applyPolyfill, ReflowStrategy } from '../package/index';

describe('attributeChangedCallback', () => {
    beforeAll(() => {
        // app polyfill
        applyPolyfill(ReflowStrategy.NONE);
    });

    it('add one and watch it', (done) => {
        const attributeChangedCallbackValues: string[] = [];
        /**
         * Simple custom elemnt
         */
        class MyElement extends HTMLElement {
            static get observedAttributes() {
                return ['attribute-one'];
            }

            connectedCallback() {
                if (this.isConnected) {
                    this.innerHTML = 'loaded';
                }
            }

            attributeChangedCallback(name: string, oldValue: string, newValue: string) {
                attributeChangedCallbackValues.push(name, oldValue, newValue);
            }
        }

        /**
         * define element and add it to body
         * if polyfill does nopt work it will then fail here
         */
        customElements.define('app-root', MyElement);
        document.body.innerHTML = '<app-root id="my-element" attribute-one="initvalue"></app-root>';

        /**
         * wait for render and check if value is set
         */
        requestAnimationFrame(() => {
            const node = document.getElementById('my-element');
            expect(node && node.textContent).toEqual('loaded');

            // set newvalue so we can also test change trigger
            node && node.setAttribute('attribute-one', 'newvalue');

            requestAnimationFrame(() => {
                // init set
                expect(attributeChangedCallbackValues[0]).toEqual('attribute-one');
                expect(attributeChangedCallbackValues[1]).toEqual(null);
                expect(attributeChangedCallbackValues[2]).toEqual('initvalue');
                // after edit
                expect(attributeChangedCallbackValues[3]).toEqual('attribute-one');
                expect(attributeChangedCallbackValues[4]).toEqual('initvalue');
                expect(attributeChangedCallbackValues[5]).toEqual('newvalue');
                done();
            });
        });
    });

    it('remove attribute and see nothing triggers', (done) => {
        const attributeChangedCallbackValues: string[] = [];
        /**
         * Simple custom elemnt
         */
        class MyElement extends HTMLElement {
            connectedCallback() {
                if (this.isConnected) {
                    this.innerHTML = 'loaded';
                }
            }

            attributeChangedCallback(name: string, oldValue: string, newValue: string) {
                attributeChangedCallbackValues.push(name, oldValue, newValue);
            }
        }

        /**
         * define element and add it to body
         * if polyfill does nopt work it will then fail here
         */
        customElements.define('app-root', MyElement);
        document.body.innerHTML = '<app-root id="my-element" attribute-one="initvalue"></app-root>';

        /**
         * wait for render and check if value is set
         */
        requestAnimationFrame(() => {
            const node = document.getElementById('my-element');
            expect(node && node.textContent).toEqual('loaded');

            // set newvalue so we can also test change trigger
            node && node.setAttribute('attribute-one', 'newvalue');

            requestAnimationFrame(() => {
                // init set
                expect(attributeChangedCallbackValues.length).toEqual(0);
                done();
            });
        });
    });

    it('bring it back', (done) => {
        const attributeChangedCallbackValues: string[] = [];
        /**
         * Simple custom elemnt
         */
        class MyElement extends HTMLElement {
            static get observedAttributes() {
                return ['attribute-one'];
            }

            connectedCallback() {
                if (this.isConnected) {
                    this.innerHTML = 'loaded';
                }
            }

            attributeChangedCallback(name: string, oldValue: string, newValue: string) {
                attributeChangedCallbackValues.push(name, oldValue, newValue);
            }
        }

        /**
         * define element and add it to body
         * if polyfill does nopt work it will then fail here
         */
        customElements.define('app-root', MyElement);
        document.body.innerHTML = '<app-root id="my-element" attribute-one="initvalue"></app-root>';

        /**
         * wait for render and check if value is set
         */
        requestAnimationFrame(() => {
            const node = document.getElementById('my-element');
            expect(node && node.textContent).toEqual('loaded');

            // set newvalue so we can also test change trigger
            node && node.setAttribute('attribute-one', 'newvalue');

            requestAnimationFrame(() => {
                // init set
                expect(attributeChangedCallbackValues[0]).toEqual('attribute-one');
                expect(attributeChangedCallbackValues[1]).toEqual(null);
                expect(attributeChangedCallbackValues[2]).toEqual('initvalue');
                // after edit
                expect(attributeChangedCallbackValues[3]).toEqual('attribute-one');
                expect(attributeChangedCallbackValues[4]).toEqual('initvalue');
                expect(attributeChangedCallbackValues[5]).toEqual('newvalue');
                done();
            });
        });
    });

    it('use another', (done) => {
        const attributeChangedCallbackValues: string[] = [];
        /**
         * Simple custom elemnt
         */
        class MyElement extends HTMLElement {
            static get observedAttributes() {
                return ['attribute-two'];
            }

            connectedCallback() {
                if (this.isConnected) {
                    this.innerHTML = 'loaded';
                }
            }

            attributeChangedCallback(name: string, oldValue: string, newValue: string) {
                attributeChangedCallbackValues.push(name, oldValue, newValue);
            }
        }

        /**
         * define element and add it to body
         * if polyfill does nopt work it will then fail here
         */
        customElements.define('app-root', MyElement);
        document.body.innerHTML =
            '<app-root id="my-element" attribute-one="initvalue" attribute-two="initvalue1"></app-root>';

        /**
         * wait for render and check if value is set
         */
        requestAnimationFrame(() => {
            const node = document.getElementById('my-element');
            expect(node && node.textContent).toEqual('loaded');

            // set newvalue so we can also test change trigger
            node && node.setAttribute('attribute-two', 'newvalue1');

            requestAnimationFrame(() => {
                // init set
                expect(attributeChangedCallbackValues[0]).toEqual('attribute-two');
                expect(attributeChangedCallbackValues[1]).toEqual(null);
                expect(attributeChangedCallbackValues[2]).toEqual('initvalue1');
                // after edit
                expect(attributeChangedCallbackValues[3]).toEqual('attribute-two');
                expect(attributeChangedCallbackValues[4]).toEqual('initvalue1');
                expect(attributeChangedCallbackValues[5]).toEqual('newvalue1');
                done();
            });
        });
    });

    it('use both', (done) => {
        const attributeChangedCallbackValues: string[] = [];
        /**
         * Simple custom elemnt
         */
        class MyElement extends HTMLElement {
            static get observedAttributes() {
                return ['attribute-one', 'attribute-two'];
            }

            connectedCallback() {
                if (this.isConnected) {
                    this.innerHTML = 'loaded';
                }
            }

            attributeChangedCallback(name: string, oldValue: string, newValue: string) {
                attributeChangedCallbackValues.push(name, oldValue, newValue);
            }
        }

        /**
         * define element and add it to body
         * if polyfill does nopt work it will then fail here
         */
        customElements.define('app-root', MyElement);
        document.body.innerHTML =
            '<app-root id="my-element" attribute-one="initvalue" attribute-two="initvalue1"></app-root>';

        /**
         * wait for render and check if value is set
         */
        requestAnimationFrame(() => {
            const node = document.getElementById('my-element');
            expect(node && node.textContent).toEqual('loaded');

            // set newvalue so we can also test change trigger
            node && node.setAttribute('attribute-one', 'newvalue');
            node && node.setAttribute('attribute-two', 'newvalue1');

            requestAnimationFrame(() => {
                // init set
                expect(attributeChangedCallbackValues[0]).toEqual('attribute-one');
                expect(attributeChangedCallbackValues[1]).toEqual(null);
                expect(attributeChangedCallbackValues[2]).toEqual('initvalue');

                // init set
                expect(attributeChangedCallbackValues[3]).toEqual('attribute-two');
                expect(attributeChangedCallbackValues[4]).toEqual(null);
                expect(attributeChangedCallbackValues[5]).toEqual('initvalue1');

                // after edit
                expect(attributeChangedCallbackValues[6]).toEqual('attribute-one');
                expect(attributeChangedCallbackValues[7]).toEqual('initvalue');
                expect(attributeChangedCallbackValues[8]).toEqual('newvalue');

                // after edit
                expect(attributeChangedCallbackValues[9]).toEqual('attribute-two');
                expect(attributeChangedCallbackValues[10]).toEqual('initvalue1');
                expect(attributeChangedCallbackValues[11]).toEqual('newvalue1');
                done();
            });
        });
    });
});
