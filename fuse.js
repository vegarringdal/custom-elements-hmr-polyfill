const { fusebox, sparky } = require('fuse-box');
const { pluginTypeChecker } = require('fuse-box-typechecker');

class Context {
    getConfig() {
        return fusebox({
            target: 'browser',
            homeDir: './',
            output: `dev`,
            entry: `src/index.ts`,
            webIndex: {
                template: `src/index.html`
            },
            logging: { level: 'verbose' },
            dependencies: {
                include: ['tslib']
            },
            cache: {
                root: '.cache',
                enabled: true
            },
            watch: { ignored: ['dist', 'dev'] },
            hmr: true,
            devServer: true,
            
            plugins: [
                pluginTypeChecker({
                    basePath: '.',
                    tsConfig: './tsconfig.json'
                })
            ]
        });
    }
}
const { task } = sparky(Context);

task('default', async ctx => {
    const fuse = ctx.getConfig();
    await fuse.runDev();
});
