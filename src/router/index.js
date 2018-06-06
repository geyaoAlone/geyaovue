import Vue from 'vue'
import Router from 'vue-router'
import Login from '../pages/login'
import FirstPage from '../pages/firstPage'
Vue.use(Router)

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
