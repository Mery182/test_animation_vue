import { createRouter, createWebHistory } from 'vue-router'
import Home from '../components/Home.vue'
import Anime from '../components/Anime.vue'
import GSAP from '../components/GSAP.vue'
import Js from '../components/Js.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', component: Home },
    { path: '/js', component: Js },
    { path: '/anime', component: Anime },
    { path: '/gsap', component: GSAP }
  ]
})

export default router
