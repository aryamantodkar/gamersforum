const mongoose = require('mongoose');
const cors = require('cors');
const express = require('express');
const app = express();
require('dotenv').config();
const dotenv = require('dotenv');
app.use(express.json());
app.use(express.urlencoded());
app.use(cors());
const postroutes = require('./Controllers/postController');
const authroute = require('./Controllers/auth');

const dbURI = process.env.DB_CONNECT;

mongoose.connect(dbURI,{useNewUrlParser:true,useUnifiedTopology:true})
    .then((result)=>{
        console.log('connected to db')
    })
    .catch((err)=>{
        console.log(err)
    })
app.listen(process.env.PORT || 9000,()=>{
    console.log('server is up and running');
});
app.use('/',postroutes);
app.use('/',authroute);

