import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Categoria from '../views/Categoria.vue'
import Sucursal from '../views/Sucursal.vue'
import Producto from '../views/Producto.vue'
import Comprar from '../views/ProductosXCategoria.vue'


const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/categoria',
    name: 'Categoria',
    component: Categoria,
    meta: { requiresAuth: true } //requiere autorización
  },
  {
    path: '/sucursal',
    name: 'Sucursal',
    component: Sucursal,
    meta: { requiresAuth: true } //requiere autorización
  },
  {
    path: '/producto',
    name: 'Producto',
    component: Producto,
    meta: { requiresAuth: true } //requiere autorización
  },
  {
    path: '/comprar',
    name: 'Comprar',
    component: Comprar
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
