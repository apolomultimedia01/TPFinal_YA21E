const mongoose = require('mongoose')
const {Schema} = mongoose

//IMPORTANTE: Los campos que se manden desde afuera, que no estén en el modelo, los ignora (por eso no filtraba)

const Product = new Schema({
    name : {
        type: String,
        required: true
    },
    categoryId : {
        type: String,
        required: true
    }
}, {
    collection: 'products'
})

module.exports = mongoose.model('Product', Product)
