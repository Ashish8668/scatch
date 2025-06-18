const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    image: String ,
    name : String,
    price : Number,
    discount : {
        Type : Nummber,
        default : 0
    },
    bgclr : String,
    textclr : String ,
    panelclr : String 
})


module.exports = mongoose.model('product', productSchema);   //user is a model name