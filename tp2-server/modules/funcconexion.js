
const mongoose = require('mongoose')
const DSN = 'mongodb://localhost:27017/tpfinal-ya21e'; // Data source name

module.exports = {
    conectar: async function (req, res, next){
        //esto es async, así que le pongo el await
        await mongoose.connect(DSN, {serverSelectionTimeoutMS: 2000});
    
        mongoose.connection.on('error', err => {
            console.log(err.message);
            res.status(500).end(); 
        });
    
        next();
    }
}