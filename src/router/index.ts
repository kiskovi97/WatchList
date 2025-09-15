import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ShowView from '@/views/ShowView.vue'
import ExploreView from '@/views/ExploreView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/show/:id',
      name: 'show',
      component: ShowView,
    },
    {
      path: '/explore',
      name: 'explore',
      component: ExploreView,
    },
  ],
})

export default router
