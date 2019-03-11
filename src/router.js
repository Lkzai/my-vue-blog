import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Read from './views/Read.vue'
import Detail from './views/Detail.vue'
import User from './views/User.vue'
import Sociality from './views/Sociality.vue'
import Followers from './views/Followers.vue'
import Following from './views/Following.vue'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/read',
      name: 'read',
      component: Read
    },
    {
      path: '/detail',
      name: 'detail',
      component: Detail
    },
    {
      path: '/user',
      name: 'user',
      component: User
    },
    {
      path: '/sociality',
      component: Sociality,
      children: [
        {
          path: '/',
          name: 'followers',
          component: Followers
        },
        {
          path: 'following',
          name: 'following',
          component: Following
        }
      ]
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.name !== 'read') {
    if (sessionStorage.getItem("token") && sessionStorage.getItem("token") !== '') {
      next();
    } else {
      next('/read')
    }
  } else {
    next();
  }
})


export default router