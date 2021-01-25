/**
 * Export der Komponente läuft über "rollup"
 * Das scheint die einzige Möglichkeit zu sein die funktioniert
 *
 * Weitere Infos:
 *      https://rollupjs.org/guide/en/
 *
 * Cheat-Sheet:
 *      https://devhints.io/rollup
 */
import typescript from 'rollup-plugin-typescript2'
import pkg from './package.json'
import commonjs from '@rollup/plugin-commonjs' // Convert CommonJS modules to ES6
import vue from 'rollup-plugin-vue' // Handle .vue SFC files
import resolve from '@rollup/plugin-node-resolve'
import del from 'rollup-plugin-delete'
import css from 'rollup-plugin-css-porter'
import scss from 'rollup-plugin-scss'
import babel from '@rollup/plugin-alias'
import { terser } from "rollup-plugin-terser"
import alias from '@rollup/plugin-alias'
import image from '@rollup/plugin-image'

const name = "MobiAdComponents";
const lib = 'mobiad-components';

const globals = {
    'tslib': 'tslib',
    'vue-property-decorator': 'vuePropertyDecorator',
    '@mmit/logging' : 'logging',
    'spark-md5': 'SparkMD5',
};

export default {
    input: 'src/index.ts', // our source file

    output: [
        {
            // Keep the bundle as an ES module file, suitable for other bundlers
            // and inclusion as a <script type=module> tag in modern browsers
            name,
            file: `lib/${lib}.esm.js`,
            format: 'esm', // the preferred format
            sourcemap: true,
        },
        {
            // Universal Module Definition, works as amd, cjs and iife all in one
            name,
            file: `lib/${lib}.umd.js`,
            format: 'umd',
            sourcemap: true,
            globals,
            exports: 'named',
        },
        {
            // A self-executing function, suitable for inclusion as a <script> tag.
            // (If you want to create a bundle for your application, you probably want to use this.)
            name,
            file: `lib/${lib}.min.js`,
            format: 'iife',
            sourcemap: true,
            plugins: [terser()],
            globals,
            exports: 'named',
        },
        {
            // CommonJS, suitable for Node and other bundlers
            name,
            file: `lib/${lib}.cjs.js`,
            format: 'cjs',
            sourcemap: true,
            globals,
            exports: 'named',
        },
    ],
    // Unterdrückt die Fehlermeldung "Mixing named and default exports"
    // (Kommt von index.ts - da wird das so gemacht)
    // exports: 'named',

    external: [
        ...Object.keys(pkg.dependencies || {}),
        // "vue-class-component",
        // "vue-property-decorator",
        "tslib",
        "vue",
        "vuex",
        "vuex-class",
        "vuetify",
        "vuetify/lib",
    ],
    plugins: [
        alias({
            '@': __dirname + '/src/main'
        }),
        typescript({
            typescript: require('typescript'),
            objectHashIgnoreUnknownHack: true,
            module: 'esnext',

            tsconfig: "tsconfig.json",
            tsconfigOverride: { exclude: [
                "node_modules", "tests",
                    "src/main.ts",
                    "src/router.ts",
                    "src/plugins",
                    "src/simulations",
                    "src/views",
                ] }
        }),

        babel({
            exclude: 'node_modules/**',
            sourceMaps: 'both'
        }),
        
        // [Rollup Plugin Vue](https://rollup-plugin-vue.vuejs.org/)
        vue({
            css: true, // Dynamically inject css as a <style> tag
            compileTemplate: true, // Explicitly convert template to render function
            defaultLang: { script: 'ts' },
        }),
        scss(),
        image(),
        css(),
        resolve(),
        // terser() // minifies generated bundles

        commonjs(),
        del({
            targets: 'lib/main.d.ts',
            hook: 'generateBundle'
        })
    ]
};
