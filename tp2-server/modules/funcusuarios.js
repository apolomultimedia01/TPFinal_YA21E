const Usuarios = require('../models/user')

module.exports = {

    validar: async function (req, res) {

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
    
    }, 

    insert: async function (req, res) {

        try{
            const existe = await Usuarios.exists({ email : req.body.email })
            if(!existe){
                
                Usuarios.create(req.body)
                .then((data) => {
                    res.status(200);
                    res.send(data);
                })
                .catch(err => {
                    console.log(err.message);
                    res.status(404).end(); 
                })
            }else{
                console.log("El usuario ya existe");
                res.status(409);
                res.send();
            }
        }catch(error){
            console.log(error.message);
            res.status(404).end(); 
        }
        
    },

    delete: (req, res) => {

        Usuarios.findByIdAndDelete({ _id : req.params.id }) 
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            console.log(err.message);
            res.status(404).end(); 
        })
    
    },

    update: (req, res) => {

        try{
            Usuarios.findByIdAndUpdate(req.params.id, req.body)
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
        
    },
     
    get: (req, res) => {

        Usuarios.find()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            console.log(err.message);
            res.status(404).end(); 
        })
    
    }
}