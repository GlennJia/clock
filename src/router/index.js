const routes = [
  {
    path: '/',
    name: 'Welcome',
    component: () => import('@/views/WelcomeForm.vue')
  },
  {
    path: '/index',
    name: 'Index',
    component: () => import('@/views/Index.vue')
  }
] 