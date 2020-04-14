import { applyPolyfill, ReflowStrategy } from '../package/index';

describe('adoptedCallback', () => {
    beforeAll(() => {
        // app polyfill
        applyPolyfill(ReflowStrategy.NONE);
    });

    it('when would someone use this?', (done) => {
        /**
         * Simple custom elemnt
         */
        let adoptedCallbackValue = 'none';
        class MyElement extends HTMLElement {
            connectedCallback() {
                if (this.isConnected) {
                    this.innerHTML = 'I work';
                }
            }

            adoptedCallback(oldDocument: any, newDocument: any) {
                adoptedCallbackValue = `adopted from ${oldDocument.documentURI} to ${newDocument.documentURI}`;
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

            const iframe2 = document.createElement('iframe');
            iframe2.id = 'i2';
            document.body.appendChild(iframe2);
            const iframe2Window = iframe2.contentWindow;
            node && iframe2Window && iframe2Window.document.body.appendChild(node);

            requestAnimationFrame(() => {
                expect(adoptedCallbackValue).toEqual(
                    'adopted from http://localhost/ to http://localhost/'
                );

                done();
            });
        });
    });
});
