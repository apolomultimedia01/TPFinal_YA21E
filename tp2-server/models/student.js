const mongoose = require('mongoose')
const {Schema} = mongoose

const Student = new Schema({
    name : {
        type: String,
        required: true
    }
}, {
    collection: 'students'
})

module.exports = mongoose.model('Student', Student)
