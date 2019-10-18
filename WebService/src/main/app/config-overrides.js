const path = require('path');
const WasmPackPlugin = require("@wasm-tool/wasm-pack-plugin");

/**
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

    return config;
};*/




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



    return config;
};










/**
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


    config.module.rules.push(
        {
            test: /worker\.js$/,
            use: {
                loader: 'worker-loader',
                options: {
                    name: 'js/worker.[hash].js'
                }
            }
        }
    );


    config.module.rules.push(
        {
            test: /worker\.js$/,
            use: {
                loader: 'worker-loader',
                options: {
                    name: 'js/worker.[hash].js'
                }
            }
        },
        {
            test: /\.wasm$/,
            type: 'javascript/auto',
            use: [
                {
                    loader: 'file-loader',
                    options: {
                        name: 'wasm/[name].[hash].[ext]',
                        publicPath: '../'
                    }
                }
            ]
        }
    );

    return config;
};*/


















































/**
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

    //--
    console.log(config);
    /**
    config.push(
        {
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
        }
    );*/

    /**
    if (!config.plugins) {
        config.plugins = [];
    }

    config.plugins.push(
        new WasmPackPlugin({
            crateDirectory: path.resolve(__dirname, "../rust"),
            outDir: "pkg"
        })
    );

    console.log(config);

    return config;
};

const tmp = module.exports;

module.exports = [];

module.exports.push(tmp);




console.log("...");
//console.log(module);*/