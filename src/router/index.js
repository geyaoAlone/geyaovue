import Vue from 'vue'
import Router from 'vue-router'
import Login from '../pages/login'
import FirstPage from '../pages/firstpage'
import MyTimeLine from '../pages/myTimeLine'
Vue.use(Router)

const routes = [
  {
    path: '/',
    component: FirstPage
  }, {
    path: '/login',
    component: Login
  }, {
    path: '/firstPage',
    component: FirstPage
  }, {
    path: '/timeline',
    component: MyTimeLine
  }
]
export default new Router({
  base: '/pro/',
  routes
})
