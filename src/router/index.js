import Vue from 'vue'
import Router from 'vue-router'
import Login from '../pages/login'
Vue.use(Router)

const routes = [
  {
    path: '/',
    component: Login
  }
]
export default new Router({
  routes
})
