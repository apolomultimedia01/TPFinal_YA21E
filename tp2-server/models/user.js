const mongoose = require('mongoose')
const {Schema} = mongoose

//IMPORTANTE: Los campos que se manden desde afuera, que no estén en el modelo, los ignora (por eso no filtraba)

const User = new Schema({
    name : {
        type: String,
        required: true
    },
    email : {
        type: String,
        required : true
    },
    pass : {
        type: String,
        required : true
    }
}, {
    collection: 'users'
})

module.exports = mongoose.model('User', User)
