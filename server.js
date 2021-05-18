const express=require('express');
const cors = require('cors')
const connectDB=require('./config/db')



const app=express();
// app.use(cors({ origin: true }));

//Conntect DataBase

app.use(cors());


connectDB();



//Init Middleware
app.use(express.json({extended: false}))


app.use(cors({
    origin: 'http://localhost:3000'
  }));

// app.get('/api/auth', function (req, res, next) {
//   res.json({msg: 'This is CORS-enabled for all origins!'})
// })



app.get('/',(req,res)=>{

res.send('API Running');

})

//define routes 


app.use('/api/users',require('./routes/api/users'));
app.use('/api/auth',require('./routes/api/auth'));
app.use('/api/profile',require('./routes/api/profile'));
app.use('/api/posts',require('./routes/api/post'));




const PORT=process.env.PORT || 5000;


app.listen(PORT, ()=>{
    console.log(`Server started on ${PORT}`)
});