const path = require('path');
const WasmPackPlugin = require("@wasm-tool/wasm-pack-plugin");
//const WorkerPlugin = require('worker-plugin');

module.exports = function override(config, env) {


    const wasmExtensionRegExp = /\.wasm$/;

    config.resolve.extensions.push('.wasm');

    config.module.rules.forEach(rule => {
        (rule.oneOf || []).forEach(oneOf => {
            if (oneOf.loader && oneOf.loader.indexOf('file-loader') >= 0) {
                // Make file-loader ignore WASM files
                oneOf.exclude.push(wasmExtensionRegExp);
            }
        });
    });

    // Add a dedicated loader for WASM
    config.module.rules.push({
        test: wasmExtensionRegExp,
        include: path.resolve(__dirname, 'src'),
        use: [{ loader: require.resolve('wasm-loader'), options: {} }]
    });



    /**
    console.log("Entry:");
    const tmp = config.entry;

    //console.log(tmp);

    config.entry = [
        tmp[0],
        tmp[1],
        './src/worker.js'
    ];
    console.log(config.entry);

    console.log("Targets:");

    console.log(config.targets);


    console.log(config);
    */

    const tmp = config;

    const workerConfig = {
        entry: "./src/worker.js",
        target: "webworker",
        plugins: [
            new WasmPackPlugin({
                crateDirectory: path.resolve(__dirname, "../rust"),
                outDir: "pkg"
            })
        ],
        resolve: {
            extensions: [".js", ".wasm"]
        },
        output: {
            path: path.resolve(__dirname, "dist"),
            filename: "worker.js"
        },
        mode: "development"
    };

    config = [tmp, workerConfig];



    /**
    if (!config.plugins) {
        config.plugins = [];
    }
    config.plugins.push(
        new WorkerPlugin()
    );*/


    /**
    config.entry = "./src/worker.js";
    config.target = "webworker";
    config.plugins.push(
        new WasmPackPlugin({
            crateDirectory: path.resolve(__dirname, "../rust"),
            outDir: "pkg",
        })
    );
    config.resolve = { extensions: [".js", ".wasm"] };
    config.output = {
            path: path.resolve(__dirname, "dist"),
            filename:
                "worker.js"
        };
    config.mode = "development";*/

    return config;
};