/* eslint-disable @typescript-eslint/no-unused-vars */
import { applyPolyfill, ReflowStrategy } from '../package/index';

// imple decorator fucntion so we get to test if it makes out hmr fail
export function simpleDecoratorFN(
    elementName: any,
    elementDefinitionOptions?: ElementDefinitionOptions
) {
    return function reg(elementClass: any) {
        const Base: any = class extends elementClass {
            constructor() {
                super();
            }
            connectedCallback() {
                if (super.connectedCallback) {
                    super.connectedCallback.call(this);
                }
            }
            disconnectedCallback() {
                if (super.disconnectedCallback) {
                    super.disconnectedCallback.call(this);
                }
            }
            attributeChangedCallback(name: any, oldValue: any, newValue: any) {
                if (super.attributeChangedCallback) {
                    super.attributeChangedCallback.call(this, name, oldValue, newValue);
                }
            }
        };
        if (elementDefinitionOptions) {
            customElements.define(elementName, Base, elementDefinitionOptions);
        } else {
            customElements.define(elementName, Base);
        }
    };
}

describe('test our decorator', () => {
    beforeAll(() => {
        // app polyfill
        applyPolyfill(ReflowStrategy.NONE);
    });

    beforeEach(() => {
        // app polyfill
        document.body.innerHTML = '';
    });

    it('use baseclass with decorator', (done) => {
        /**
         * Simple custom elemnt
         */
        @simpleDecoratorFN('app-root')
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
        document.body.innerHTML = '<app-root id="my-element"></app-root>';

        /**
         * wait for render and check if value is set
         */
        requestAnimationFrame(() => {
            const node = document.getElementById('my-element');
            expect(node && node.textContent).toEqual('changed');
            done();
        });
    });

    it('use baseclass with decorator2', (done) => {
        /**
         * Simple custom elemnt
         */
        @simpleDecoratorFN('app-root')
        class MyElement extends HTMLElement {
            static test = 'changed2';
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
        document.body.innerHTML = '<app-root id="my-element"></app-root>';

        /**
         * wait for render and check if value is set
         */
        requestAnimationFrame(() => {
            const node = document.getElementById('my-element');
            expect(node && node.textContent).toEqual('changed2');
            done();
        });
    });
});
