// import Vuetify, { VBtn } from 'vuetify/lib';
import Vue from 'vue';
import HelloWorld from './components/HelloWorld.vue';

/**
 * Fügt eine "install" function bei MLiveForce hinzu
 *
 * Weitere Infos:
 *      https://vuejs.org/v2/cookbook/packaging-sfc-for-npm.html#Packaging-Components-for-npm
 */
const HelloWorldElements = {
    install(vue: typeof Vue): void {
        vue.component('HelloWorld', HelloWorld);
    },
};

if (typeof window !== 'undefined' && window.Vue) {
    // @ts-ignore
    window.Vue.use(HelloWorldElements, {});
}

export { HelloWorld };
export default HelloWorldElements;
