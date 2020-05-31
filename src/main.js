import Vue from 'vue';
import SuiVue from 'semantic-ui-vue';
import axios from 'axios';
import App from './App.vue';
import router from './router';
import 'semantic-ui-css/semantic.min.css';
import 'animate.css';

Vue.config.productionTip = false;
Vue.use(SuiVue);
Vue.prototype.$http = axios;

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');
