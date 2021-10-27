import axios from 'axios'

const apiClient = axios.create({
  baseURL: `http://localhost:5000`,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
})

const rutaUsuario = '/usuario';

export default {
  validarUsuario(usuario) {
    return apiClient.post(`${rutaUsuario}/validar`, usuario)
  }
  /*
  getUsuarios() {
    return apiClient.get(rutaUsuario)
  },
  getUsuariosPor(id) {
    return apiClient.get(`${rutaUsuario}/${id}`)
  },
  postUsuarios(usuario) {
    return apiClient.post(`${rutaUsuario}/`, usuario)
  },
  deleteUsuario(id) {
    return apiClient.delete(`${rutaUsuario}/${id}`)
  },
  putUsuario(usuario) {
      console.log(usuario)
      return (`${rutaUsuario}/${usuario.id}` , usuario)
  },
  */
}