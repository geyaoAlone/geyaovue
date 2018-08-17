// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router/index'
// vuex.store 这个不用管，是组件之间数据共享的插件
import store from './store'
import http from './utils/http'

/* eslint-disable no-new */

Vue.prototype.$http = http;
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  components: { App },
  template: '<App/>'
}).$mount('#app');
