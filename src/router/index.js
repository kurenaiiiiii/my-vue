import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import Layout from '@/layout'


export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '首页', icon: 'dashboard' }
    },
   ]
  },

  {
    path: '/role',
    component: Layout,
    children: [{
      path: '/role',
      name: 'role',
      component: () => import('@/views/role/index'),
      meta: { title: '角色管理', icon: 'example' }
    },]
  },
  {
    path: '/permission',
    component: Layout,
    children: [{
      path: '/permission',
      name: 'permission',
      component: () => import('@/views/permission/index'),
      meta: { title: '权限管理', icon: 'form' }
    },]
  },
  {
    path: '/personnel',
    component: Layout,
    children: [{
      path: '/personnel',
      name: 'personnel',
      component: () => import('@/views/personnel/index'),
      meta: { title: '员工管理', icon: 'table' }
    },]
  },
  {
    path: '/salarys',
    component: Layout,
    children: [{
      path: 'salarys',
      name: 'salarys',
      component: () => import('@/views/salarys/index'),
      meta: { title: '工資', icon: 'nested' }
    },
  
  ]
  },
  {
    path: '/userleave',
    component: Layout,
    children: [{
      path: 'userleave',
      name: 'userleave',
      component: () => import('@/views/userleave/index'),
      meta: { title: '请假', icon: 'el-icon-date' }
    },
    {
      path: 'userleave1',
      name: 'userleave1',
      component: () => import('@/views/userleave/index1'),
      meta: { title: '权限', icon: 'form' },
      hidden:true
    },
  
  ]
  },


  
 

  
 

  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
