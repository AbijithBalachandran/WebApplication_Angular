const mongoose = require("mongoose");
mongoose.connect("mongodb://127.0.0.1:27017/student_mangement")
.then(()=>console.log('mongodb connected'))
.catch((err)=>console.error('mongodb connection error : ',err));

const cors = require("cors");
const express = require("express");

const cookieParser = require('cookie-parser')
const path = require('path')
const app = express();

require('dotenv').config();


const config = require('./config/config');

app.use(cors({
    origin: 'http://localhost:4200', 
  credentials: true
}));


app.use(express.json());
app.use(cookieParser());

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const studentRouter = require('./router/student');
const adminRouter = require('./router/admin');

app.use('/',studentRouter);
app.use('/admin',adminRouter);

app.listen(3000,()=>{
    console.log('http://localhost:3000');
})