export function reflowDOM() {
    if (document.body) {
        requestAnimationFrame(() => {
            // reflow the whole tree
            const oldBodyHtml = document.body.innerHTML;
            document.body.innerHTML = '';
            document.body.innerHTML = oldBodyHtml;
        });
    }
}
