// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router/index'
// vuex.store 这个不用管，是组件之间数据共享的插件
import store from './store'
import http from './utils/http'
import Es6Promise from 'es6-promise'
import VueQuillEditor from 'vue-quill-editor'
import ElementUI from 'element-ui'
Es6Promise.polyfill()
/* eslint-disable no-new */
// require styles 引入样式
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
Vue.prototype.$http = http
Vue.config.productionTip = false
Vue.use(VueQuillEditor)
Vue.use(ElementUI)
new Vue({
  router,
  store,
  components: { App },
  template: '<App/>'
}).$mount('#app')
