// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import Request from '@/plugins/request';
import App from './App.vue';
import router from './router';
import Filters from './filters';
import '@/utils/markdown';

Vue.config.productionTip = true;

Vue.use(Request);
Vue.use(Filters);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
});
