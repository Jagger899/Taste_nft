import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
 history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'main',
      component: () => import('@/pages/Main.vue')
    },

    {
      path: '/artwork',
      name: 'artwork',
      component: () => import('@/pages/Artwork.vue')
    },
    {
      path: '/creator',
      name: 'creator',
      component: () => import('@/pages/Creator.vue')
    }
  ]
})

export default router
