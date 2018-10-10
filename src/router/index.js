import Vue from 'vue'
import Router from 'vue-router'
import FirstPage from '../pages/firstpage'
import MyBlogs from '../pages/myBlogs'
import ArticleDetail from '../pages/articleDetail'
import WebsiteUpdateinfo from '../pages/websiteUpdateinfo'
import EditBlog from '../pages/editBlog'
import LeaveMessage from '../pages/leaveMessage'
Vue.use(Router)

const routes = [
  {
    path: '/',
    component: FirstPage
  }, {
    path: '/firstPage',
    component: FirstPage
  }, {
    path: '/myBlogs',
    component: MyBlogs
  }, {
    name: 'article_detail',
    path: '/articleDetail',
    component: ArticleDetail
  }, {
    name: 'website_updateinfo',
    path: '/websiteUpdateinfo',
    component: WebsiteUpdateinfo
  }, {
    name: 'edit-blog',
    path: '/editBlog',
    component: EditBlog
  }, {
    name: 'leave-Message',
    path: '/leaveMessage',
    component: LeaveMessage
  }
]
export default new Router({
  base: '/pro/',
  routes
})
