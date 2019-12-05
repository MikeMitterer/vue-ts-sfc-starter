import Vue from 'vue';
import App from './App.vue';
import vuetify from './plugins/vuetify';

Vue.config.productionTip = false;
Vue.config.performance = process.env.NODE_ENV === 'development';

new Vue({
    vuetify,
    render: (h) => h(App),
}).$mount('#app');
