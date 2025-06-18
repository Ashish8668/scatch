const express = require('express');
const router = express.Router();


router.get('/',(req,res)=>{
    res.send('hey products');     //we can make response handlers 
})

module.exports = router ;