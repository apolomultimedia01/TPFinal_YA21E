const express = require('express'); //import

const mongoose = require('mongoose')
const User = require('./models/user')

const cors = require('cors')

const app = express();  //new

//const funciones = require('./modules/funciones.js');

const recurso = 'usuario';
const ruta = `/${recurso}`;

const puerto  = 5000;

const DSN = 'mongodb://localhost:27017/tpfinal-ya21e'; // Data source name

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
    console.log('conecta');
    next();
})


app.get(ruta, (req, res) => {

    User.find()
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        console.log(err.message);
        res.status(404).end(); 
    })

})

app.get(ruta + '/:id', (req, res) => {

    const existe = User.findById({ _id : req.params.id }) // NO ANDAAAAAAAA:

    .then(data => {
        res.send(data);
    })
    .catch(err => {
        console.log(err.message);
        res.status(404).end(); 
    })

})

app.get(ruta + '/email/:mail', (req, res) => {

    console.log(`llega con este mail: ${req.params.mail}`);

    User.find({ mail : req.params.mail })  //NO FILTRA!!!!
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        console.log(err.message);
        res.status(404).end(); 
    })
    
})

app.post(ruta + '/validar', async function (req, res) {

    User.find({ email : req.body.email, pass : req.body.pass })
    .then(data => {
        console.log(data);

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


app.listen(puerto); 
