export default [
  {
    path: '/',
    name: 'index',
    component: () => import('@/views/index.vue'),
    meta: {
      auth: true, // 是否需要授权
      title: '首页'
    }
  },
  {
    path: '/login',
    name: 'auth.login',
    component: () => import('@/views/Login'),
    meta: {
      title: '登录'
    }
  },
  {
    path: '/register',
    name: 'auth.register',
    component: () => import('@/views/register'),
    meta: {
      title: '注册'
    }
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: () => import('@/views/dashboard/layout.vue'),
    children: [{
      path: 'audio',
      name: 'dashboard.audio',
      component: () => import('@/views/audio.vue'),
      meta: {
        title: '音频管理',
        auth: true
      }
    }, {
      path: 'suggest',
      name: 'dashboard.suggest',
      component: () => import('@/views/suggest.vue'),
      meta: {
        title: '建议',
        auth: true
      }
    }, {
      path: 'user',
      name: 'dashboard.user',
      component: () => import('@/views/user.vue'),
      meta: {
        title: '用户',
        auth: true
      }
    }]
  },
  {
    path: '/*',
    component: () => import('@/views/404.vue')
  }
]
