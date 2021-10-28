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
      .then((data) => {
        console.log(data);
        return data
      })
      .catch((error) => {
        console.log(`Error = ${error.message}`);
      })

  },
  getUsuarios() {
    return apiClient.get(rutaUsuario)
  },
  getUsuariosPorId(id) {
    return apiClient.get(`${rutaUsuario}/${id}`)
  }

}
