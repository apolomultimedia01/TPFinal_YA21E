import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'
import About from '../views/About.vue'
import Sistema from '../views/Sistema.vue'
import Login from '../views/Login.vue'
import Categorias from '../views/CategoriasLista.vue'
import CategoriasEdit from '../views/CategoriasEdit.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: About
  },
  {
    path: '/sistema',
    name: 'Sistema',
    component: Sistema,
    meta: { requiresAuth: true } //requiere autorización
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/Categorias',
    name: 'Categorias',
    component: Categorias,
    meta: { requiresAuth: true } //requiere autorización
  },
  {
    path: '/CategoriasEdit',
    name: 'CategoriasEdit',
    component: CategoriasEdit,
    meta: { requiresAuth: true } //requiere autorización
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const loggedIn = localStorage.getItem('usr');
  if(to.matched.some(record => record.meta.requiresAuth) && !loggedIn){
    next('/');
  }
  next();
})

export default router
