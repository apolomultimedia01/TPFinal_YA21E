
import { createStore } from 'vuex'
import srvUsuario from '../services/UsuariosService.js'

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
    }
  },
  getters: {
      islogged(state){
          return !!state.usuario;
      }
  }
})

export default store