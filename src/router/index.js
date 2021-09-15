import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/Login'
import Layout from '@/views/Layout'
import Home from '@/views/Home'
import Qa from '@/views/Qa'
import Video from '@/views/Video'
import Profile from '@/views/Profile'
import Search from '@/views/Search'
import Article from '@/views/Article'
import User from '../user/index.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    component: Login
  },

  {
    path: '/',
    component: Layout,
    children: [
      {
        path: '',
        component: Home
      },
      {
        path: '/wenda',
        component: Qa
      },
      {
        path: '/video',
        component: Video
      },
      {
        path: '/profile',
        component: Profile
      }
    ]

  },
  {
    path: '/article/:articleId',
    component: Article,
    props: true
  },
  {
    path: '/search',
    component: Search
  },
  {
    path: '/user',
    component: User
  }
]

const router = new VueRouter({
  routes
})

export default router
