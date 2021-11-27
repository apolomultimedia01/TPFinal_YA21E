const express = require('express'); //import

const cors = require('cors')

const app = express();  //new

const puerto  = 5000;

const conexion = require('./modules/funcconexion');

const rutaUsuario = '/usuario';
const rutaCategorias = '/categoria';
const rutaProductos = '/producto';
const rutaSucursales = '/sucursal';

const funcUsuarios = require('./modules/funcusuarios');
const funcCategorias = require('./modules/funccategorias');
const funcProductos = require('./modules/funcproductos');
const funcSucursales = require('./modules/funcsucursales');


app.use(cors());

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(conexion.conectar);


// -----------------------------------------   USUARIOS ------------------------------------------------------

app.post(rutaUsuario + '/validar', funcUsuarios.validar)

app.post(rutaUsuario, funcUsuarios.insert)

app.put(rutaUsuario + '/editar/:id', funcUsuarios.update)

app.delete(rutaUsuario + '/borrar/:id', funcUsuarios.delete)

app.get(rutaUsuario, funcUsuarios.get)

// -----------------------------------------  FIN  USUARIOS ------------------------------------------------------


// -----------------------------------------   CATEGORIAS ------------------------------------------------------

app.post(rutaCategorias, funcCategorias.insert)

app.put(rutaCategorias + '/editar/:id', funcCategorias.update)

app.delete(rutaCategorias + '/borrar/:id', funcCategorias.delete)

app.get(rutaCategorias, funcCategorias.get)

app.get(rutaCategorias + '/:id', funcCategorias.getxid)

// -----------------------------------------  FIN CATEGORIAS ------------------------------------------------------



// -----------------------------------------   PRODUCTOS ------------------------------------------------------

app.post(rutaProductos, funcProductos.insert)

app.put(rutaProductos + '/editar/:id', funcProductos.update)

app.delete(rutaProductos + '/borrar/:id', funcProductos.delete)

app.get(rutaProductos, funcProductos.get)

app.get(rutaProductos + '/:id', funcProductos.getxid)

app.get(rutaProductos + '/xcategoria/:id', funcProductos.getxcategoria)

// -----------------------------------------  FIN PRODUCTOS ------------------------------------------------------

// -----------------------------------------   SUCURSALES ------------------------------------------------------

app.post(rutaSucursales, funcSucursales.insert)

app.put(rutaSucursales + '/editar/:id', funcSucursales.update)

app.delete(rutaSucursales + '/borrar/:id', funcSucursales.delete)

app.get(rutaSucursales, funcSucursales.get)

app.get(rutaSucursales + '/:id', funcSucursales.getxid)

// -----------------------------------------  FIN SUCURSALES ------------------------------------------------------




app.listen(puerto); 
