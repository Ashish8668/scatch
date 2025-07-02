const express = require('express');
const router = express.Router();
const isLoggedIn = require('../middlewares/isLoggedIn')
const { registerUser , loginUser, logout } = require('../controllers/authController');
const usermodel = require('../models/usermodel');

router.get('/',(req,res)=>{
    res.send('hey');     //we can make response handlers 
})

router.post('/register', registerUser)

router.post('/login', loginUser)

router.get('/logout',isLoggedIn ,logout);

router.get('/addtocart/:productId', isLoggedIn ,async (req, res) => {       // can use JavaScript for AJAX (If you want a dynamic cart without reloading the page)
  const user =  await usermodel.findOne({email : req.user.email});
  user.cart.push(req.params.productId);
  await user.save();
  req.flash('success', "Product added to cart");
  res.redirect('/shop'); // or back to products page
});

router.get('/cart', isLoggedIn ,async (req,res)=>{
    const user =  await usermodel.findOne({email : req.user.email}).populate('cart');
    res.render('cart',{user}); 
})

module.exports = router ;