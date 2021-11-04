import axios from 'axios'

const apiClient = axios.create({
  baseURL: `http://localhost:3000`,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
})

export default {
  getProductos() {
    return apiClient.get('/producto')
  },
  getProductosPor(id) {
    return apiClient.get('/producto/' + id)
  },
  postProductos(producto) {
    return apiClient.post('/producto/', producto)
  },
  deleteProducto(id) {
    return apiClient.delete('/producto/borrar/' + id)
  },
  putProducto(producto) {
      console.log(producto)
      return ('/producto/editar/' + producto.id , producto)
  },
}
