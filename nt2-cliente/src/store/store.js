
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
      //location.reload();
    }
  },
  actions:{
    login({commit}, usuario){
        const usr = srvUsuario.validarUsuario(usuario);
        if(usr!==null){
          console.log(`entró a login con ${usuario}`);
          commit('SET_USER_DATA', usuario);
        }
    },
    logout({commit}){
      console.log(`entró a logout`);
      commit('CLEAR_USER_DATA'); 
  }
  },
  getters: {
      islogin(state){
          return !!state.usuario;
      }
  }
})

export default store