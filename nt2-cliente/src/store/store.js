
import { createStore } from 'vuex'
import srvUsuario from '../services/UsuariosService.js'

// Create a new store instance.
const store = createStore({
  state() {
    let usuario = null
    let productos = []

    if (localStorage.getItem('usr') != null) {
      usuario = localStorage.getItem('usr')
    }

    if (localStorage.getItem('carrito') != null) {
      productos = JSON.parse(localStorage.getItem('carrito'))
    }

    return {
      usuario: usuario,
      productos: productos
    }
  },
  mutations: {

    SET_USER_DATA(state, usuario) {
      state.usuario = usuario;
      localStorage.setItem('usr', usuario); //Guardo en memoria del browser el usuario
    },
    CLEAR_USER_DATA(state) {
      state.usuario = null;
      localStorage.removeItem('usr'); //quito de memoria del browser el usuario
    },

    ADD_PRODUCT(state, producto) {
      state.productos.push(producto);
      localStorage.setItem('carrito', JSON.stringify(state.productos)); //Guardo en memoria del browser el listado de productos
    }

  },
  actions: {
    async login({ commit }, usuario) {

      await srvUsuario.validarUsuario(usuario)
        .then((data) => {
          if (data != undefined) {
            commit('SET_USER_DATA', usuario);
          }
        })
        .catch((error) => {
          console.log(error.message);
        })

    },
    logout({ commit }) {
      commit('CLEAR_USER_DATA');
    },
    async agregarAlCarrito({ commit }, producto) {
      commit('ADD_PRODUCT', producto);
    },
  },
  getters: {
    islogged(state) {
      return !!state.usuario;
    },
    getCarritos(state) {
      return state.productos;
    }
  }
})

export default store