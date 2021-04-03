const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = express.Router();
const User = require('../models/User');
const {loginValidation , registerValidation} = require('./validation');


router.post('/register',async (req,res)=>{
    const {error} = registerValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message)

    const emailExist = await User.findOne({email: req.body.email});
    if(emailExist) return res.status(400).send('Email id already taken');

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password,salt);

    const user = new User ({
        name: req.body.name,
        email: req.body.email,
        password:hashedPassword
    });
    try{
        const savedUser = await user.save();
        res.send(savedUser);
    }
    catch{
        res.status(400).send(err);
    }
})

router.post('/login',async(req,res)=>{
    const {error} = loginValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message)

    const user = await User.findOne({email: req.body.email});
    if(!user) return res.status(400).send('Invalid Email id');

    const validPass = await bcrypt.compare(req.body.password,user.password)
    if(!validPass) return res.status(400).send('Invalid Password');

    const token = jwt.sign({_id: user._id},process.env.TOKEN);
    res.header('authtoken',token).send(token);
    
})

router.get('/users',(req,res)=>{
    User.find((err,data)=>{
        if(!err){
            res.send(data)
        }
        else{
            console.log('error 1')
        }
    })
})
// router.get('/login',(req,res)=>{
//     const loggedin = User.findOne({email:req.body.email,password:req.body.password});
//     if(loggedin){
//         res.send('loggedin')
//     }
//     else{
//         res.send('not logged in')
//     }
// })

module.exports = router;