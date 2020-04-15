import { applyPolyfill, ReflowStrategy } from '../package/index';

describe('replace constructor and redefine', () => {
    beforeAll(() => {
        // app polyfill
        applyPolyfill(ReflowStrategy.NONE);
    });

    it('test variable and constructor', (done) => {
        /**
         * Simple custom elemnt
         */
        class MyElement extends HTMLElement {
            test: string = 'world';
            constructor() {
                super();
                this.test = 'hello ' + this.test + ' 1';
            }

            connectedCallback() {
                if (this.isConnected) {
                    this.innerHTML = this.test;
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
            expect(node && node.textContent).toEqual('hello world 1');
            done();
        });
    });

    it('Replace values', (done) => {
        /**
         * Simple custom elemnt
         */
        class MyElement extends HTMLElement {
            test: string = 'water';
            constructor() {
                super();
                this.test = 'hello ' + this.test + ' world';
            }
            connectedCallback() {
                if (this.isConnected) {
                    this.innerHTML = this.test;
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
            expect(node && node.textContent).toEqual('hello water world');
            done();
        });
    });

    it('drop variable and constructor', (done) => {
        /**
         * Simple custom elemnt
         */
        class MyElement extends HTMLElement {
            connectedCallback() {
                if (this.isConnected) {
                    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
                    // @ts-ignore
                    this.innerHTML = this.test;
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
            expect(node && node.textContent).toEqual('undefined');
            done();
        });
    });

    it('bring it back', (done) => {
        /**
         * Simple custom elemnt
         */
        class MyElement extends HTMLElement {
            test: string = 'world';
            constructor() {
                super();
                this.test = 'hello ' + this.test + ' 1';
            }

            connectedCallback() {
                if (this.isConnected) {
                    this.innerHTML = this.test;
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
            expect(node && node.textContent).toEqual('hello world 1');
            done();
        });
    });
});
