'use strict';

require('dotenv').config();

const cookieParser = require('cookie-parser');
const cors = require('cors');
const bodyParser = require('body-parser');
const express = require('express')
const app=express();
app.use(express.json());
app.use(cors())
app.use(cookieParser())


const port = process.env.PORT|| 3001;
const route_one = require('./routes/user.js');
// DATABASE CONNECTION
const connectDB = require("./db");
connectDB()
// routes
const{adminAuth,userAuth}=require('./middleware/auth');
app.get('/admin',adminAuth,(req,res)=>res.send("admin Route"))
app.get('/basic',userAuth,(req,res)=>res.send("user Route"))
app.use("/api/auth",require('./auth/Route'))

app.listen(port,()=>{
    console.log('listening on port:', port)
})
