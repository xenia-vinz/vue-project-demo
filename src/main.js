import Vue from 'vue';
import VueSuperagent from 'vue-superagent';
import VueLodash from 'vue-lodash';
import VModal from 'vue-js-modal';
import SocialSharing from 'vue-social-sharing';
import store from './store';
import App from './App.vue';

Vue.use(VueSuperagent);
Vue.use(VueLodash, {
  name: '$_',
});
Vue.use(VModal);
Vue.use(SocialSharing);

Vue.config.productionTip = false;

new Vue({
  store,
  render: h => h(App),
}).$mount('#app');
