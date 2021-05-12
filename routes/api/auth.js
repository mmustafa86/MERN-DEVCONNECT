const express=require('express');

const router = express.Router();
const auth =require('../../middleware/auth');
const User=require('../../models/User');
const { check, validationResult } = require("express-validator/check");
const bcrypt=require('bcryptjs');
const jwt= require('jsonwebtoken');
require('dotenv').config()


//@route  Get api/auth
//@dec    Test route
//@acess  Public

router.get('/',
auth,async (req,res)=>{

try{
const user =await User.findById(req.user.id).select('-password');
res.json(user);

}catch (err){
console.error(err.message);
res.status(500).send('server Error')

}



    res.send('Auth route')
})


//@route  POST api/auth
//@dec    Authenticate user & get token 
//@acess  Public

router.post(
    "/",
    [
      check("email", "Please include a valid email").isEmail(),
      check(
        "password",
        "Please is required"
      ).exists(),
    ],
    async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
  
      const {  email, password } = req.body;
  
      try {
  let user=await User.findOne({email});
  
  if(!user){
      return res.status(400).json({errors:[{msg: 'Invalid Credentials'}]})
  }
  
  //bcrypt 
 const isMatch=await bcrypt.compare(password ,user.password)

if(!isMatch){
    return res.status(400).json({errors:[{msg: 'Invalid Credentials'}]})
}


  
  const payload={
      user:{
          id:user.id
      }
  }
  //jwt
  jwt.sign(payload,
      process.env.JWTSECRET,
      { expiresIn: 360000 },
      (err,token)=>{
  if(err){
     throw err;
  }
  res.json({token});
      }
      );
      //   res.send("User registered");
      } catch (err) {
          console.error(err.message);
          res.status(500).send('Server error');
      }
    }
  );
  




module.exports=router;