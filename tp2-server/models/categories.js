const mongoose = require('mongoose')
const {Schema} = mongoose

//IMPORTANTE: Los campos que se manden desde afuera, que no estén en el modelo, los ignora (por eso no filtraba)

const Category = new Schema({
    name : {
        type: String,
        required: true
    }
}, {
    collection: 'categories'
})

module.exports = mongoose.model('Category', Category)
