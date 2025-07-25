const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    image: Buffer,
    name : String,
    price : Number,
    discount : {
        type : Number,
        default : 0
    },
    bgcolor : String,
    textcolor : String ,
    panelcolor : String 
})


module.exports = mongoose.model('product', productSchema);   //user is a model name