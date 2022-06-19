const mongoose = require('mongoose')
const {Schema} = mongoose

//IMPORTANTE: Los campos que se manden desde afuera, que no estén en el modelo, los ignora (por eso no filtraba)

const Branch = new Schema({
    name : {
        type: String,
        required: true
    },
    address : {
        type: String,
        required: true
    }
}, {
    collection: 'branches'
})

module.exports = mongoose.model('Branch', Branch)
