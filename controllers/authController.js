const userModel = require('../models/usermodel')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { generateToken } = require('../utils/generateToken');

//controllers me routes k functions hote h

module.exports.registerUser = async (req,res)=>{
   try{
     let {email , password , fullname}= req.body ; //joe based valiation lagao
     let user =  await userModel.findOne({email : email});
     if (user) {
        req.flash("error"  , "you are already registered. Please Login")
        return res.status(401).redirect('/');
     }
     bcrypt.genSalt(10, (err , salt)=>{
        bcrypt.hash(password,salt,async (err, hash)=>{
            if (err) return res.send(err.message);
            else{
              let user = await userModel.create({
              fullname,
              email,
              password : hash
             })
            let token = generateToken(user);
            res.cookie("token", token);
            res.redirect('/shop')
            }
        })
     })
   } catch(err){
    res.send(err.message);
   }
}

module.exports.loginUser = async (req,res)=>{
    try {
       let {email , password} = req.body ; 
       let user =  await userModel.findOne({email : email});
       if(!user) {
        req.flash("error" , "email or password is incorrect");
        return res.status(401).redirect('/');
       }
       bcrypt.compare(password, user.password ,(err, result)=>{
        if(result) {
            let token = generateToken(user);
            res.cookie("token", token);
            return res.redirect('/shop');
        }
            req.flash("error","email or password is incorrect");
            return res.redirect('/');
       })
    } catch (error) {
        res.send(error.message);
    }
}

module.exports.logout = (req,res)=>{
    res.cookie('token', '');
    res.redirect('/');
}