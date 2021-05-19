/**
 * simple helper script to make builds
 */

const build = (target) => {
    const checker = require('esbuild-helpers').TypeChecker({
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

async function run(){
    require('esbuild-helpers').clearFolders('./dist');
    ['CommonJS', 'AMD', 'System', 'UMD', 'ES6', 'ES2015', 'ESNext'].forEach((target) => {
        build(target);
    });
}

run()