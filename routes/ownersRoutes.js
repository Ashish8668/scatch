const express = require('express');
const router = express.Router();


router.get('/',(req,res)=>{
    res.send('hey owner');     //we can make response handlers 
})

module.exports = router ;