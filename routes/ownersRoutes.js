const express = require('express');
const router = express.Router();
const ownerModel = require('../models/ownermodel');

router.get('/',(req,res)=>{
    res.render('owner-login')    //we can make response handlers 
})

router.get('/admin', (req,res)=>{
    let success = req.flash("success");
    res.render('createproducts' , {success});
})

if(process.env.NODE_ENV === "development"){  // $env:NODE_ENV = "development" we can create such env variables
  router.post('/create' , async (req,res)=>{
    let owners = await ownerModel.find();
    if(owners.length > 0){
       return res.status(503).send('owner already exists');    //later ye route nhi chalega in production mode
    }
    
    let {fullname , email, password , picture , gstin } = req.body;

    let createdOwner = await ownerModel.create({
        fullname,
        email,
        password,
        picture,
        gstin
    })
    res.status(201).send(createdOwner)
  })


}
module.exports = router ;