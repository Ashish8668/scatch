const express = require('express');
const router = express.Router();
const upload = require('../config/multer-config');
const productmodel = require('../models/productmodel.');

router.get('/',(req,res)=>{
    res.send('hey products');     //we can make response handlers 
})

router.post('/create', upload.single("image") , async (req , res)=>{
    let { name , price , discount , bgcolor , textcolor , panelcolor} = req.body ;
    let product = await productmodel.create({
     image : req.file.buffer,
     name,
     price,
     discount,
     bgcolor,
     textcolor,
     panelcolor
    })
    req.flash("success" , "produst created successfully")
    res.redirect('/owners/admin');
})

module.exports = router ;