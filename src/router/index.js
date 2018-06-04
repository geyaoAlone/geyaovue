import Vue from 'vue'
import Router from 'vue-router'

import {post,fetch,patch,put} from '@/comm/common'
import {delCookie,getCookie} from '@/comm/cookieUtil'

import Login from '../pages/login'
import FirstPage from '../pages/firstPage'
Vue.use(Router)


Vue.prototype.$post = post;
const routes = [
  {
    path: '/',
    component: Login
  }, {
    path: '/firstPage',
    component: FirstPage
  }
]
export default new Router({
  routes
})
