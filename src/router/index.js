import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/rules',
    name: 'Rules',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Rules.vue')
  },
  {
    path: '/join',
    name: 'JoinBlank',
    component: () => import('../views/Join.vue')
  },
  {
    path: '/join/:gameId',
    name: 'JoinGameId',
    params: true,
    component: () => import('../views/Join.vue')
  },
  {
    path: '/create',
    name: 'CreateGame',
    component: () => import('../views/Create.vue')
  },
  {
    path: '/game',
    name: 'Game',
    component: () => import('../views/Game.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
