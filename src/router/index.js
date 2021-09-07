import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/Login'
import Layout from '@/views/Layout'
import Home from '@/views/Home'
import Qa from '@/views/Qa'
import Video from '@/views/Video'
import Profile from '@/views/Profile'
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
  }
]

const router = new VueRouter({
  routes
})

export default router
