
const mongoose=require('mongoose');
require('dotenv').config()

const db= process.env.MONGODB



const connectDB= async()=>{

    try{
      await  mongoose.connect(db, {useNewUrlParser: true, useUnifiedTopology: true ,useCreateIndex:true});

      console.log("MonogoDB Conntected....")
    } catch (err){
console.error(err.message);
//exit process with failure 
process.exit(1);
    }

}

module.exports= connectDB;