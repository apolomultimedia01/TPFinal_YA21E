
import { createStore } from 'vuex'
import srvUsuario from '../services/Usuarios.js'

// Create a new store instance.
const store = createStore({
  state () {
    return {
      usuario: null
    }
  },
  mutations: {
    SET_USER_DATA(state, usuario){
        console.log(`entró a setuserdata con ${usuario}`);
        state.usuario = usuario;
        localStorage.setItem('usr', usuario); //Guardo en memoria del browser el usuario
    },
    CLEAR_USER_DATA(state){
      console.log(`entró a clearuserdata`);
      state.usuario = null;
      localStorage.removeItem('usr'); //quito de memoria del browser el usuario
    }
  },
  actions:{
    login({commit}, usuario){
        srvUsuario.validarUsuario(usuario)
          .then((data) => {
            console.log(`Se logueó con ${usuario}`);
            console.log(`Devolvió ${data.email}`);
            commit('SET_USER_DATA', usuario);
          })
    },
    logout({commit}){
      console.log(`entró a logout`);
      commit('CLEAR_USER_DATA'); 
  }
  },
  getters: {
      islogged(state){
          return !!state.usuario;
      }
  }
})

export default store