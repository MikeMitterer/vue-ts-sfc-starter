// const { VueLoaderPlugin } = require('vue-loader')
const package = require('./package');
// const VueLoaderPlugin = require('vue-loader/lib/plugin');

// const { BASE_PATH, SITE_ORIGIN, META } = require("./src/assets/constants.json");
const devMode = process.env.NODE_ENV !== 'production';
//const date = moment().format('YYYY.MM.DD HH:mm');
const date = new Date();

// vue inspect zeigt die webpack.js an
const templateParams = {
    VUE_APP_VERSION: package.version,
    VUE_APP_DEV_MODE: devMode,
    VUE_APP_PUBLISHED: date,
};

// https://cli.vuejs.org/guide/mode-and-env.html#environment-variables
process.env.VUE_APP_VERSION = templateParams.VUE_APP_VERSION;
process.env.VUE_APP_DEV_MODE = templateParams.VUE_APP_DEV_MODE;
process.env.VUE_APP_PUBLISHED = templateParams.VUE_APP_PUBLISHED;

module.exports = {
    css: {
        extract: false
    },

    chainWebpack: (config) => {
        config.plugin('html').tap((args) => {
            return args.map((arg) => {
                return Object.assign({}, arg, {
                    templateParameters(params) {
                        return Object.assign({}, arg.templateParameters(params), templateParams);
                    },
                });
            });
        });

        // config.plugin("vuetify-loader").use(VuetifyLoaderPlugin);
    },

    configureWebpack: (config) => {
        config.performance = {
            // hints: false
            maxEntrypointSize: 512000,
            maxAssetSize: 512000
        };
    },

    // configureWebpack: config => {
    //     // if(process.env.NODE_ENV === 'production') {
    //         config.module.rules.forEach(rule => {
    //             if (rule.use) {
    //                 let idx = rule.use.findIndex(w => w.loader === 'thread-loader')
    //                 if (idx !== -1) rule.use.splice(idx, 1)
    //             }
    //         })
    //     // }
    // },
    //
    // chainWebpack: (config) => {
    //     config.module
    //         .rule('vue')
    //         .use('vue-loader')
    //         .loader('vue-loader')
    //         .tap((options) => {
    //             // modify the options...
    //             // options.transpileOnly = false;
    //             options.target = {
    //                 ie: 11
    //             };
    //             return options
    //         });
    //
    //     config.module.rule("ts").uses.delete("cache-loader");
    //     // config.module.rule("tsx").uses.delete("cache-loader");
    //
    //     config.module
    //         .rule('ts')
    //         .use('ts-loader')
    //         .loader('ts-loader')
    //         .tap(opts => {
    //             opts.transpileOnly = false;
    //             opts.happyPackMode = false;
    //             return opts;
    //         });
    // }

};
