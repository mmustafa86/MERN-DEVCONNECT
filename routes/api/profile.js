const express=require('express');

const router = express.Router();




//@route  Get Api/profile
//@dec    Test route
//@acess  Public

router.get('/',(req,res)=>{

    res.send('Profile route')
})





module.exports=router;