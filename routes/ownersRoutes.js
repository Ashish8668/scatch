const express = require('express');
const router = express.Router();
const ownerModel = require('../models/ownermodel');
const isOwner = require('../middlewares/isOwner')
const bcrypt = require('bcrypt');
const {generateToken} = require('../utils/generateToken')

router.get('/admin', isOwner , (req,res)=>{
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

router.post('/login', async (req,res)=>{
    try {
       let {email , password} = req.body ; 
       let owner =  await ownerModel.findOne({email : email});
       if(!owner) {
        req.flash("error" , "email or password is incorrect");
        return res.redirect('/owners')
       }
       bcrypt.compare(password, owner.password ,(err, result)=>{
        if(result) {
            let admintoken = generateToken(owner);
            res.cookie("admintoken", admintoken);
            return res.redirect('/owners/admin');
        }
            req.flash("error","email or password is incorrect");
            return res.redirect('/owners');
       })
    } catch (error) {
        res.send(error.message);
    }
})

router.get('/logout',(req,res)=>{
  res.clearCookie("admintoken").redirect('/owners');

})

router.get('/',(req,res)=>{
  let error = req.flash("error");
  res.render('owner-login', {error});
})

module.exports = router ;