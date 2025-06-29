const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
fullname : {
    Type : String,
} ,
email  : String,
password : String,
cart  :{
    type : Array,
    default : []
} ,
orders : {
    type : Array ,
    default : []
},
contact : Number ,
picture : String 
})

module.exports = mongoose.model('user', userSchema);   //user is a model name