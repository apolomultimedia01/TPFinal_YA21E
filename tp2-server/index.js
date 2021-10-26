const express = require('express'); //import

const app = express();  //new

//const funciones = require('./modules/funciones.js');

const recurso = 'estudiante';
const ruta = `/${recurso}`;

const puerto  = 5000;

const mongoose = require('mongoose')
const Student = require('./models/student')

const estudiantes = [{"dni":123545, "nombre": "Laura", "apellido": "Billi", "edad": 40}]

const DSN = 'mongodb://localhost:27017/tp2-tp-web-server'; // Data source name

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

app.post(ruta, async function (req, res) {
    //req.body trae la info de req
    const estudiante = req.body;
    
    console.log(estudiante.dni);

    const existe = await Student.exists({ dni : estudiante.dni }) // NO ANDAAAAAAAA

    console.log(existe);
    /*const existe = estudiantes.find((est) => {
        return est.dni == estudiante.dni;
    })*/

    if(!existe){
        //estudiantes.push(estudiante);
        Student.save(estudiante);
        res.status(200);
        res.json(estudiante);
    }else{
        res.status(409);
        res.send();
    }
//no anda
    
})

app.get(ruta, (req, res) => {

    Student.find()
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        console.log(err.message);
        res.status(404).end(); 
    })
    //res.json(estudiantes)
})

app.get(ruta + '/:dni', (req, res) => {

    Student.find({"dni": req.params.dni})
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        console.log(err.message);
        res.status(404).end(); 
    })

    //console.log(`Con esto entra dni: ${req.params.dni}`);
    //res.json(estudiantes.find((est) => est.dni == req.params.dni));
})

app.get(ruta + '/edad/:rango', (req, res) => {
    const rango = req.params.rango.split('-');
    
    if(rango.length==2){
        Student.find({ edad: { $gte: rango[0] , $lte: rango[1] } })  //NO FILTRA!!!!
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            console.log(err.message);
            res.status(404).end(); 
        })
        //res.json(estudiantes.filter((est) => est.edad >= rango[0] && est.edad <= rango[1]));
    }else if(rango.length==1){
        Student.find({ edad: { $gte: rango[0] } })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            console.log(err.message);
            res.status(404).end(); 
        })

        //res.json(estudiantes.filter((est) => est.edad >= rango[0]));
    }else{
        res.status(404).end(); 
    }
    
})

//app.delete(ruta + '/:dni', funciones.delete(req,res) )

//Levanto la instancia del servidor y 
//la pongo a escuchar en el puerto 4444

app.listen(puerto); 
