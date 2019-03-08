import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import tips from './components/Tips/index'

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
            component: () => import('./views/Read.vue')
        },
        {
            path: '/detail',
            name: 'detail',
            component: () => import('./views/Detail.vue')
        },
        {
          path: '/user',
          name: 'user',
          component: () => import('./views/User.vue')
        },
      {
        path: '/sociality',
        component: () => import('./views/Sociality.vue'),
        children: [
          {
            // 当 /user/:id/profile 匹配成功，
            // UserProfile 会被渲染在 User 的 <router-view> 中
            path: '/',
            name: 'followers',
            component: () => import('./views/Followers.vue')
          },
          {
            // 当 /user/:id/posts 匹配成功
            // UserPosts 会被渲染在 User 的 <router-view> 中
            path: 'following',
            name: 'following',
            component: () => import('./views/Following.vue')
          }
        ]
      }
    ]
})

router.beforeEach((to, from, next) => {
  if(to.name !== 'read') {
    if(sessionStorage.getItem("token")) {
      next();
    }else {
      next('/read')
    }
  }else {
    next();
  }
})


export default router