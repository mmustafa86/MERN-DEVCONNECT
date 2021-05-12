const jwt=require('jsonwebtoken');

require('dotenv').config()


const secret= process.env.JWTSECRET;


module.exports=function(req,res,next){
//get the token from the header 
const token =req.header('x-auth-token');

//check if not token 

if(!token){
return res.status(401).json({msg:' No token ,authorization denied' })
}

//verify token 

try {
const decoded=jwt.verify(token,secret);

req.user=decoded.user;

next();

}catch (err){

res.status(401).json({msg: 'Token not valid'});
}




}