import axios from 'axios'

const apiClient = axios.create({
  baseURL: `http://localhost:3000`,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
})

export default {
  getCategorias() {
    return apiClient.get('/categoria')
  },
  getCategoriasPor(id) {
    return apiClient.get('/categoria/' + id)
  },
  postCategorias(categoria) {
    return apiClient.post('/categoria/', categoria)
  },
  deleteCategoria(id) {
    return apiClient.delete('/categoria/' + id)
  },
  putCategoria(categoria) {
      console.log(categoria)
      return ('/categoria/' + categoria.id , categoria)
  },
}
