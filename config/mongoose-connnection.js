const mongoose = require('mongoose');
const dbgr =  require('debug')('development:mongoose')
require('dotenv').config();

mongoose
.connect(process.env.MONGODB_URI)   //.env bhi krr skte h
.then(()=>{                       //config dynamically devlopment/production se value uthayega  (works on basis of env variables)
    dbgr("connected!");
})
.catch((err)=>{
   console.log(err);
})

module.exports = mongoose.connection ;