const {
    clearFolders,
    addDefaultIndex,
    nodejs,
    client,
    makeAllPackagesExternalPlugin,
    postcssPlugin,
    single,
  } = require("esbuild-helpers");
  
  clearFolders("dist_client");
  
  
  /**
   * client bundle
   */
  client(
    { watch: "./src/**/*.ts" },
    {
      color: true,
      define: {
        DEVELOPMENT: "true",
      },
      entryPoints: ["./src/sample/index.ts"],
      outfile: "./dist_client/index.js",
      minify: false,
      bundle: true,
      platform: "browser",
      sourcemap: true,
      logLevel: "error",
      incremental: true,
    }
  );
  
  
  /**
   * index file for project
   */
  addDefaultIndex({
    distFolder: "dist_client",
    entry: "./index.js",
    publicFolders:[],
    hbr: true,
    devServer:true,
    devServerPort:80,
    indexTemplate: /*html*/ `<!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>Document</title>
        
          $bundle
        </head>
        <body>
        </body>
        </html>
        `,
  });