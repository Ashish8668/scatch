const ownermodel = require("../models/ownermodel");
const jwt = require('jsonwebtoken');

module.exports = async (req,res,next)=>{
    if(!req.cookies.admintoken) {
    req.flash("error","you need to login as admin first");
    return res.redirect('/owners');
}
  try {
    let decoded = jwt.verify(req.cookies.admintoken, process.env.JWT_KEY);
    let owner = await ownermodel.findOne({email : decoded.email}).select("-password");
    req.owner = owner ;
    next();
  } catch (error) {
    req.flash("error", "something went wrong")
    res.redirect('/owners');
  }

}