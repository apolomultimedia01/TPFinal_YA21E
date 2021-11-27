const Categorias = require('../models/categories')

module.exports = {
    
    insert: async function (req, res) {

        try{
            const existe = await Categorias.exists({ name : req.body.name })
            if(!existe){
                
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
        
    },

    update: (req, res) => {

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
        
    },

    delete: (req, res) => {

        Categorias.findByIdAndDelete({ _id : req.params.id }) 
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            console.log(err.message);
            res.status(404).end(); 
        })

    },

    get: (req, res) => {

        Categorias.find()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            console.log(err.message);
            res.status(404).end(); 
        })

    },

    getxid: (req, res) => {

        Categorias.findById({ _id : req.params.id }) 
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            console.log(err.message);
            res.status(404).end(); 
        })

    }
}