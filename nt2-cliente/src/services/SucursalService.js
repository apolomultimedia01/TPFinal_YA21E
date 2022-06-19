import axios from 'axios'

const apiClient = axios.create({
  baseURL: `http://localhost:5000`,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
})

export default {
  getSucursales() {
    return apiClient.get('/sucursal')
  },
  getSucursalesPor(id) {
    return apiClient.get('/sucursal/' + id)
  },
  postSucursales(sucursal) {
    return apiClient.post('/sucursal/', sucursal)
  },
  deleteSucursal(id) {
    return apiClient.delete('/sucursal/' + id)
  },
  putSucursal(sucursal) {
    console.log(sucursal._id)
    return apiClient.put('/sucursal/' + sucursal._id , sucursal)
  },
}
