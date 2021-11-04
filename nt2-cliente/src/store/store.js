
import { createStore } from 'vuex'
import srvUsuario from '../services/UsuariosService.js'

// Create a new store instance.
const store = createStore({
  state () {
    return {
      usuario: null,
      productos: []
    }
  },
  mutations: {

    SET_USER_DATA(state, usuario){
        state.usuario = usuario;
        localStorage.setItem('usr', usuario); //Guardo en memoria del browser el usuario
    },
    CLEAR_USER_DATA(state){
      state.usuario = null;
      localStorage.removeItem('usr'); //quito de memoria del browser el usuario
    },

    ADD_PRODUCT(state, id){
      state.productos.push(id);
      localStorage.setItem('carrito', state.productos); //Guardo en memoria del browser el listado de productos
    } 

  },
  actions:{
    async login({commit}, usuario){

        await srvUsuario.validarUsuario(usuario)
              .then((data) => {
                if(data!=undefined){
                  commit('SET_USER_DATA', usuario);
                }
              })
              .catch((error) => {
                console.log(error.message);
              })

    },
    logout({commit}){
      commit('CLEAR_USER_DATA'); 
    },
    async agregarAlCarrito({commit}, id){
      commit('ADD_PRODUCT', id);
    },
  },
  getters: {
      islogged(state){
          return !!state.usuario;
      },
      getCantidadProd(state){
        
        return state.productos.length;
      }
  }
})

export default store