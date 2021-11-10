const express = require('express'); //import

const mongoose = require('mongoose')

const cors = require('cors')

const app = express();  //new

//const funciones = require('./modules/funciones.js');

const puerto  = 5000;

const DSN = 'mongodb://localhost:27017/tpfinal-ya21e'; // Data source name

const rutaUsuario = '/usuario';
const Usuarios = require('./models/user')

const rutaCategorias = '/categoria';
const Categorias = require('./models/categories')

const rutaProductos = '/producto';
const Productos = require('./models/products')

const rutaSucursales = '/sucursal';
const Sucursales = require('./models/branches')

app.use(cors());

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(async function (req, res, next){
    //esto es async, así que le pongo el await
    await mongoose.connect(DSN, {serverSelectionTimeoutMS: 2000});

    mongoose.connection.on('error', err => {
        console.log(err.message);
        res.status(500).end(); 
    });

    next();
})


// -----------------------------------------   USUARIOS ------------------------------------------------------


app.post(rutaUsuario + '/validar', async function (req, res) {

    Usuarios.findOne({ email : req.body.email, pass : req.body.pass }).exec()
    .then(data => {

        if(data!==null){
            res.status(200);
            res.send(data);
            
        }else{
            res.status(401);
            res.send();
        }
    })
    .catch(err => {
        console.log(err.message);
        res.status(404).end(); 
    })

})

app.get(rutaUsuario, (req, res) => {

    Usuarios.find()
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        console.log(err.message);
        res.status(404).end(); 
    })

})

app.get(rutaUsuario + '/email/:mail', (req, res) => {

    Usuarios.findOne({ email : req.params.mail }).exec()  //El exec hay que ponerlo cuando se le ponen parámetros
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        console.log(err.message);
        res.status(404).end(); 
    })
    
})


app.get(rutaUsuario + '/:id', (req, res) => {

    Usuarios.findById({ _id : req.params.id }) 
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        console.log(err.message);
        res.status(404).end(); 
    })

})


// -----------------------------------------  FIN  USUARIOS ------------------------------------------------------


// -----------------------------------------   CATEGORIAS ------------------------------------------------------

app.post(rutaCategorias, async function (req, res) {

    try{
        const existe = await Categorias.exists({ name : req.body.name })
        if(!existe){
            console.log("va a crear");
            Categorias.create(req.body)
            .then((data) => {
                res.status(200);
                res.send(data);
            })
            .catch(err => {
                console.log(err.message);
                res.status(404).end(); 
            })
        }else{
            console.log("La categoría ya existe");
            res.status(409);
            res.send();
        }
    }catch(error){
        console.log(error.message);
        res.status(404).end(); 
    }
    
})

app.put(rutaCategorias + '/editar/:id', (req, res) => {

    try{
        Categorias.findByIdAndUpdate(req.params.id, req.body)
        .then((data) => {
            res.status(200);
            res.send(data);
        })
        .catch(err => {
            console.log(err.message);
            res.status(404).end(); 
        })
        
    }catch(error){
        console.log(error.message);
        res.status(404).end(); 
    }
    
})

app.delete(rutaCategorias + '/borrar/:id', (req, res) => {

    Categorias.findByIdAndDelete({ _id : req.params.id }) 
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        console.log(err.message);
        res.status(404).end(); 
    })

})

app.get(rutaCategorias, (req, res) => {

    Categorias.find()
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        console.log(err.message);
        res.status(404).end(); 
    })

})

app.get(rutaCategorias + '/:id', (req, res) => {

    Categorias.findById({ _id : req.params.id }) 
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        console.log(err.message);
        res.status(404).end(); 
    })

})

// -----------------------------------------  FIN CATEGORIAS ------------------------------------------------------



// -----------------------------------------   PRODUCTOS ------------------------------------------------------

app.post(rutaProductos, async function (req, res) {
    try{
        const existe = await Productos.exists({ name : req.body.name })
        if(!existe){
            Productos.create(req.body)
            .then((data) => {
                res.status(200);
                res.send(data);
            })
            .catch(err => {
                console.log(err.message);
                res.status(404).end(); 
            })
        }else{
            console.log("El producto ya existe");
            res.status(409);
            res.send();
        }
    }catch(error){
        console.log(error.message);
        res.status(404).end(); 
    }
    
})

app.put(rutaProductos + '/editar/:id', (req, res) => {

    try{

        console.log(req.body);
        Productos.findByIdAndUpdate(req.params.id, req.body)
        .then((data) => {
            res.status(200);
            res.send(data);
        })
        .catch(err => {
            console.log(err.message);
            res.status(404).end(); 
        })
        
    }catch(error){
        console.log(error.message);
        res.status(404).end(); 
    }
    
})

app.delete(rutaProductos + '/borrar/:id', (req, res) => {

    Productos.findByIdAndDelete({ _id : req.params.id }) 
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        console.log(err.message);
        res.status(404).end(); 
    })

})

app.get(rutaProductos, (req, res) => {

    Productos.find()
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        console.log(err.message);
        res.status(404).end(); 
    })

})

app.get(rutaProductos + '/:id', (req, res) => {

    Productos.findById({ _id : req.params.id }) 
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        console.log(err.message);
        res.status(404).end(); 
    })

})

app.get(rutaProductos + '/xcategoria/:id', (req, res) => {

    Productos.find({ categoryId : req.params.id }) 
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        console.log(err.message);
        res.status(404).end(); 
    })

})

// -----------------------------------------  FIN PRODUCTOS ------------------------------------------------------

// -----------------------------------------   SUCURSALES ------------------------------------------------------

app.post(rutaSucursales, async function (req, res) {

    try{
        const existe = await Sucursales.exists({ name : req.body.name })
        if(!existe){
            console.log("va a crear");
            Sucursales.create(req.body)
            .then((data) => {
                res.status(200);
                res.send(data);
            })
            .catch(err => {
                console.log(err.message);
                res.status(404).end(); 
            })
        }else{
            console.log("La sucursal ya existe");
            res.status(409);
            res.send();
        }
    }catch(error){
        console.log(error.message);
        res.status(404).end(); 
    }
    
})

app.put(rutaSucursales + '/editar/:id', (req, res) => {

    try{
        Sucursales.findByIdAndUpdate(req.params.id, req.body)
        .then((data) => {
            res.status(200);
            res.send(data);
        })
        .catch(err => {
            console.log(err.message);
            res.status(404).end(); 
        })
        
    }catch(error){
        console.log(error.message);
        res.status(404).end(); 
    }
    
})

app.delete(rutaSucursales + '/borrar/:id', (req, res) => {

    Sucursales.findByIdAndDelete({ _id : req.params.id }) 
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        console.log(err.message);
        res.status(404).end(); 
    })

})

app.get(rutaSucursales, (req, res) => {

    Sucursales.find()
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        console.log(err.message);
        res.status(404).end(); 
    })

})

app.get(rutaSucursales + '/:id', (req, res) => {

    Sucursales.findById({ _id : req.params.id }) 
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        console.log(err.message);
        res.status(404).end(); 
    })

})

// -----------------------------------------  FIN SUCURSALES ------------------------------------------------------




app.listen(puerto); 
