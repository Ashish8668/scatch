const mongoose = require('mongoose');
const dbgr =  require('debug')('development:mongoose')
const config = require('config');

mongoose
.connect(`${config.get('MONGODB_URI')}/scatch`)   //.env bhi krr skte h
.then(()=>{                       //config dynamically devlopment/production se value uthayega  (works on basis of env variables)
    dbgr("connected!");
})
.catch((err)=>{
   console.log(err);
})

module.exports = mongoose.connection ;