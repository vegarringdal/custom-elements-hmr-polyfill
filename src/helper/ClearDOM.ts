const clearDOM = () => {
    if (document.body) {
        requestAnimationFrame(() => {
            // simulate a Virtual DOM re-render
            // TODO: How to find out (after HMR) which elements actually changed?
            // TODO: The whole optimization not to reload the page is dependent of being able to tell the VDOM
            // TODO: Only to re-render those elements that changed?!
            const oldBodyHtml = document.body.innerHTML;
            document.body.innerHTML = '';
            document.body.innerHTML = oldBodyHtml;
        });
    }
};
clearDOM();
