module.exports = {
    presets: [
        [
            '@vue/cli-plugin-babel/preset', {
            "targets": {
                "esmodules": true,
                "node": "current"
                }
            },
        ],
        [
            "@babel/preset-env", {
            // "targets": {
            //    // When specifying this option, the browsers field will be ignored.
            //    "esmodules": true
            //    node: 'current'
            // },

            // Enable transformation of ES6 module syntax to another module type.
            // Setting this to false will not transform modules.
            "modules": "auto"
        }],
        "@babel/typescript"
    ],
    "plugins": [
        ["@babel/plugin-proposal-class-properties", {
            // "loose": true
        }],
        "@babel/plugin-proposal-object-rest-spread",
        "@babel/plugin-proposal-optional-chaining",

        "@babel/plugin-proposal-nullish-coalescing-operator"
    ],
    // "env": {
    //     "test": {
    //         "plugins": ["@babel/plugin-transform-modules-commonjs"]
    //     }
    // }
};
