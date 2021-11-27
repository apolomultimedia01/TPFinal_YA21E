const Productos = require('../models/products')

module.exports = {

    insert: async function (req, res) {
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
        
    },

    update: (req, res) => {

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
        
    },

    delete: (req, res) => {

        Productos.findByIdAndDelete({ _id : req.params.id }) 
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            console.log(err.message);
            res.status(404).end(); 
        })
    
    },

    get: (req, res) => {

        Productos.find()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            console.log(err.message);
            res.status(404).end(); 
        })
    
    },

    getxid: (req, res) => {

        Productos.findById({ _id : req.params.id }) 
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            console.log(err.message);
            res.status(404).end(); 
        })
    
    },

    getxcategoria: (req, res) => {

        Productos.find({ categoryId : req.params.id }) 
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            console.log(err.message);
            res.status(404).end(); 
        })
    
    }

}
