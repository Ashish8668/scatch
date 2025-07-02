const express = require('express');
const router = express.Router();
const isLoggedIn  = require('../middlewares/isLoggedIn')
const productModel = require('../models/productmodel.')

router.get('/',(req,res)=>{
    let error = req.flash("error");
    res.render('login', {error})   
})

router.get('/shop' , isLoggedIn ,async (req, res)=>{
   let products = await productModel.find();
   const success = req.flash("success");
   res.render('shop',{products , success});
})

module.exports = router ;