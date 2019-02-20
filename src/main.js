// console.log(process.env);
// import devtools from '@vue/devtools';

// console.log(process.env);
// if (process.env.NODE_ENV === 'development' && process.env.VUE_APP_USEDEVTOOLS === 'true') {
//   const devtools = require('@vue/devtools');
//   devtools.connect(
//     'http://localhost',
//     '8098'
//   );
// }
import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import api from '@/api';
import util from '@/utils/util.js';

Vue.config.productionTip = false;
Vue.prototype.$eventBus = new Vue();
//所有获取数据的地方
Vue.prototype.$api = api;
//工具类函数
Vue.prototype.$util = util;
Vue.prototype.$acme = Acme;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
