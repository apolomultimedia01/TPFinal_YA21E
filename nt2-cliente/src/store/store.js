
import { createStore } from 'vuex'
import srvUsuario from '../services/UsuariosService.js'

// Create a new store instance.
const store = createStore({
  state() {
    let usuario = null
    let productos = []
    let cantSelec = 0;

    if (localStorage.getItem('usr') != null) {
      usuario = localStorage.getItem('usr')
    }

    if (localStorage.getItem('carrito') != null) {
      productos = JSON.parse(localStorage.getItem('carrito'))
    }

    if (localStorage.getItem('cantSelec') != null) {
      cantSelec = parseInt(localStorage.getItem('cantSelec'))
    }

    return {
      usuario: usuario,
      productos: productos,
      cantSelec: cantSelec
    }
  },
  mutations: {

    SET_USER_DATA(state, usuario) {
      state.usuario = usuario;
      localStorage.setItem('usr', usuario); //Guardo en memoria del browser el usuario
      location.push("/Home");
    },
    CLEAR_USER_DATA(state) {
      state.usuario = null;
      localStorage.removeItem('usr'); //quito de memoria del browser el usuario
      location.reload()
    },

    ADD_PRODUCT(state, producto) {
      const carrito = JSON.parse(localStorage.getItem('carrito'));

      state.cantSelec += producto.cantSelec;

      var prod = null
      if (carrito != null) {
        prod = carrito.find(item => item._id === producto._id);
      }

      if (prod != null) {
        producto.cantSelec = parseInt(producto.cantSelec) + parseInt(prod.cantSelec);
        const index = state.productos.findIndex(item => {
          return (producto._id === item._id)
        })

        state.productos[index] = producto;
      } else {
        state.productos.push(producto);
      }

      localStorage.setItem('cantSelec', state.cantSelec)
      localStorage.setItem('carrito', JSON.stringify(state.productos)); //Guardo en memoria del browser el listado de productos
    },
    CLEAR_PRODUCT(state) {
      state.productos = [];
      state.cantSelec = 0;
      localStorage.removeItem('carrito');
      localStorage.removeItem('cantSelec');
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
    cerrarSesion({ commit }) {
      commit('CLEAR_USER_DATA');
    },
    async agregarAlCarrito({ commit }, [producto, cantSelec]) {
      producto.cantSelec = cantSelec;
      commit('ADD_PRODUCT', producto);
    },
    limpiarCarrito({ commit }) {
      commit('CLEAR_PRODUCT');
    },
  },
  getters: {
    islogged(state) {
      return !!state.usuario;
    },
    getCarritos(state) {
      return state.productos;
    },
    getCantSelec(state) {
      return state.cantSelec;
    }
  }
})

export default store