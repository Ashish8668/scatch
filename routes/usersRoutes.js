const express = require('express');
const router = express.Router();
const { registerUser } = require('../controllers/authController');

router.get('/',(req,res)=>{
    res.send('hey');     //we can make response handlers 
})

router.post('/register', registerUser)

module.exports = router ;