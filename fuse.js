/* eslint-disable @typescript-eslint/no-var-requires */
const { fusebox, sparky } = require('fuse-box');
const { pluginTypeChecker } = require('fuse-box-typechecker');

class Context {
    getConfig() {
        return fusebox({
            target: 'browser',
            homeDir: './',
            entry: `src/sample/index.ts`,
            webIndex: {
                template: `src/sample/index.html`,
                publicPath: './'
            },
            cache: {
                root: '.cache/sample',
                enabled: true
            },
            watcher: {
                enabled: true,
                include: ['./src']
            },
            hmr: { plugin: `./src/sample/fuseHmrPlugin.ts` },
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
const { task, rm } = sparky(Context);

task('default', async (ctx) => {
    const fuse = ctx.getConfig();
    await fuse.runDev({ bundles: { distRoot: `.cache/dist`, app: 'app.js' } });
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
                skipLibCheck: true,
                sourceMap: true,
                declaration: true,
                importHelpers: true,
                experimentalDecorators: true
            },
            exclude: ['dist', 'node_modules', 'src/sample', 'src/__tests__']
        },
        basePath: `./`,
        name: `Building ${target}`
    });

    checker.printSettings();
    const result = checker.inspectOnly();
    checker.printOnly(result);

    console.log(`  -> Emitting js`);
    result.oldProgram.emit();
};

task('build', async () => {
    await rm('./dist');
    ['CommonJS', 'AMD', 'System', 'UMD', 'ES6', 'ES2015', 'ESNext'].forEach((target) => {
        build(target);
    });
});
