const { fusebox, sparky } = require('fuse-box');
const { pluginTypeChecker, TypeChecker } = require('fuse-box-typechecker');

class Context {
    getConfig() {
        return fusebox({
            target: 'browser',
            homeDir: './',
            output: `dev`,
            entry: `src/sample/index.ts`,
            webIndex: {
                template: `src/sample/index.html`
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

const build = (target) => {
    const checker = require('fuse-box-typechecker').TypeChecker({
        tsConfigOverride: {
            compilerOptions: {
                outDir: `./dist/${target}`,
                rootDir: `./src/package`,
                target: 'es2018',
                module: target,
                lib: ['es2017', 'dom'],
                emitDecoratorMetadata: true,
                sourceMap: true,
                declaration: true,
                importHelpers: true,
                experimentalDecorators: true
            },
            exclude: ['dist', 'node_modules', 'src/sample']
        },
        basePath: `./`,
        name: `Building ${target}`
    });

    checker.printSettings();
    let result = checker.inspectOnly();
    checker.printOnly(result);
    
    console.log(`  -> Emitting js`);
    const x = result.oldProgram.emit();
};

task('build', async ctx => {
    ['CommonJS', 'AMD', 'System', 'UMD', 'ES6', 'ES2015', 'ESNext'].forEach(target => {
        build(target);
    });
});
