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
import typescript from 'rollup-plugin-typescript2';
import pkg from './package.json';
import commonjs from 'rollup-plugin-commonjs'; // Convert CommonJS modules to ES6
import vue from 'rollup-plugin-vue'; // Handle .vue SFC files
import resolve from '@rollup/plugin-node-resolve';
import del from 'rollup-plugin-delete'
import css from 'rollup-plugin-css-porter';
import sass from 'rollup-plugin-sass';

export default {
    input: 'src/index.ts', // our source file
    output: [
        {
            // Keep the bundle as an ES module file, suitable for other bundlers
            // and inclusion as a <script type=module> tag in modern browsers
            name: 'HelloWorld',
            file: 'lib/helloworld.esm.js',
            format: 'esm', // the preferred format
            sourcemap: true,
        },
        // {
        //     // Universal Module Definition, works as amd, cjs and iife all in one
        //     name: 'HelloWorld',
        //     file: 'lib/livefohelloworldrce.umd.js',
        //     format: 'umd',
        //     sourcemap: true,
        //     globals: {
        //         'vue-property-decorator': 'vuePropertyDecorator'
        //     }
        // },
        // {
        //     // A self-executing function, suitable for inclusion as a <script> tag.
        //     // (If you want to create a bundle for your application, you probably want to use this.)
        //     name: 'HelloWorld',
        //     file: 'lib/helloworld.min.js',
        //     format: 'iife',
        //     sourcemap: true,
        //     globals: {
        //         'vue-property-decorator': 'vuePropertyDecorator'
        //     },
        //     plugins: [terser()]
        // },
        // {
        //     // CommonJS, suitable for Node and other bundlers
        //     name: 'HelloWorld',
        //     file: 'lib/helloworld.cjs.js',
        //     format: 'cjs',
        //     sourcemap: true,
        // },
    ],
    // Unterdrückt die Fehlermeldung "Mixing named and default exports"
    // (Kommt von index.ts - da wird das so gemacht)
    // exports: 'named',

    external: [
        ...Object.keys(pkg.dependencies || {}),
        "tslib",
        "vue",
        // "vue-class-component",
        // "vue-property-decorator",
        "vuex",
        "vuex-class",
        "vuetify",
        "vuetify/lib"
    ],
    plugins: [
        typescript({
            typescript: require('typescript'),
            objectHashIgnoreUnknownHack: true,
            module: 'esnext',

            tsconfig: "tsconfig.json",
            tsconfigOverride: { exclude: [ "node_modules", "src/main.ts", "tests" ] }
        }),
        commonjs(),

        // [Rollup Plugin Vue](https://rollup-plugin-vue.vuejs.org/)
        vue({
            css: true, // Dynamically inject css as a <style> tag
            compileTemplate: true, // Explicitly convert template to render function
        }),
        sass(),
        css(),
        resolve(),
        // terser() // minifies generated bundles

        del({
            targets: 'lib/main.d.ts',
            hook: 'generateBundle'
        })
    ]
};
