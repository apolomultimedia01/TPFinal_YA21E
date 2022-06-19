const Sucursales = require('../models/branches');

module.exports = {

    insert: async function (req, res) {

        try{
            const existe = await Sucursales.exists({ name : req.body.name })
            if(!existe){
                
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
        
    },

    update: (req, res) => {

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
        
    },

    delete: (req, res) => {

        Sucursales.findByIdAndDelete({ _id : req.params.id }) 
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            console.log(err.message);
            res.status(404).end(); 
        })
    
    },

    get: (req, res) => {

        Sucursales.find()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            console.log(err.message);
            res.status(404).end(); 
        })
    
    },

    getxid: (req, res) => {

        Sucursales.findById({ _id : req.params.id }) 
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            console.log(err.message);
            res.status(404).end(); 
        })
    
    }

}