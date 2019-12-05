import { shallowMount, Wrapper } from '@vue/test-utils';
import MLiveForce from '../../../src/components/MLiveForce.vue';
// import Vue from 'vue';
// import { VueConstructor } from 'vue/types/vue';
// import Vuetify from 'vuetify';

// Vue.config.productionTip = false;
// Vue.use(Vuetify);

describe('MLiveForce.vue', () => {
    let wrapper: Wrapper<MLiveForce> | undefined;

    afterEach(() => {
        if (wrapper) {
            wrapper.destroy();
            wrapper = undefined;
        }
    });

    test('renders props.myProp to true', () => {
        const prop = true;
        const msg = `LiveForce! Prop: ${prop}`;

        // shallowMount rendert keine Child-Komponenten
        wrapper = shallowMount(MLiveForce, {
            // localVue,
            // vuetify,
            propsData: { myProp: prop },
        });

        expect(wrapper.text().replace(/\s+/g, ' ')).toMatch(msg);
        expect(wrapper.isVueInstance()).toBeTruthy();
    });

    test('renders props.myProp to false', () => {
        const prop = false;
        const msg = `LiveForce! Prop: ${prop}`;

        wrapper = shallowMount(MLiveForce, {
            propsData: { myProp: prop },
        });

        expect(wrapper.text().replace(/\s+/g, ' ')).toMatch(msg);
        expect(wrapper.isVueInstance()).toBeTruthy();
    });
});
