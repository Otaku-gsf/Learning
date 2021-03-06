import Vue from 'vue';
import App from './App.vue';
import './plugins/element';
import './plugins/avue';
import router from './router';
import axios from 'axios';

// 使用vue-ele-form动态表单
import EleForm from 'vue-ele-form';
Vue.use(EleForm);

const http = axios.create({
  baseURL: 'http://localhost:3000',
});

Vue.prototype.$httpajax = http;

Vue.prototype.$axios = http;

Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App),
}).$mount('#app');
