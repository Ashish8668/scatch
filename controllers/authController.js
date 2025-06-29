const userModel = require('../models/usermodel')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { generateToken } = require('../utils/generateToken');

//controllers me routes k functions hote h

module.exports.registerUser = async (req,res)=>{
   try{
     let {email , password , fullname}= req.body ; //joe based valiation lagao
     let user =  await userModel.findOne({email : email});
     if (user) return res.status(401).send("you are already registered .Please Login")
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
            res.send(user);
            }
        })
     })
   } catch(err){
    res.send(err.message);
   }
}