const express = require("express");
const router = express.Router();
const gravatar=require('gravatar')
const bcrypt=require('bcryptjs');
const jwt= require('jsonwebtoken');
require('dotenv').config()
const { check, validationResult } = require("express-validator/check");


const User = require("../../models/User");

//@route  POST Api/users
//@dec    Refister route
//@acess  Public

router.post(
  "/",
  [
    check("name", "Name is required").not().isEmpty(),
    check("email", "Please include a valid email").isEmail(),
    check(
      "password",
      "Please enter a password with 6 or more charcters"
    ).isLength({ min: 6 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

    try {
let user=await User.findOne({email});

if(user){
    return res.status(400).json({errors:[{msg: 'User already exists'}]})
}

const avatar=gravatar.url(email, {
    s:'200',
    r:'pg',
    d:'mm'
})

user=new User({
  name,
  email,
  avatar,
  password  
});



//bcrypt
const salt =await bcrypt.genSalt(10);

user.password=await bcrypt.hash(password,salt);



await user.save();

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

module.exports = router;
