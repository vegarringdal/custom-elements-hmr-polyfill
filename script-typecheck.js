const typeChecker = require('esbuild-helpers').TypeChecker({
    tsConfig: './tsconfig.json',
    basePath: './',
    tsLint: './tslint.json',
    name: 'typecheck and lint src and test folders',
    shortenFilenames: true,
    yellowOnLint: true,
    throwOnGlobal: true,
    throwOnSemantic: true,
    throwOnTsLint: true,
    throwOnSyntactic: true,
    throwOnOptions: true,
    tsConfigOverride: {
        compilerOptions: {
            rootDir: `./src/package`,
            target: 'es2018',
            module: 'es6',
            lib: ['es2017', 'dom'],
            emitDecoratorMetadata: true,
            skipLibCheck: true,
            sourceMap: true,
            declaration: true,
            importHelpers: true,
            experimentalDecorators: true
        },
        exclude: ['dist', 'node_modules', 'src/sample', 'src/__tests__']
    }
});

typeChecker.printSettings();
typeChecker.printOnly(typeChecker.inspectOnly());