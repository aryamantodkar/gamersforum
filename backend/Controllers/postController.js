const express = require('express');
const router = express.Router();
const post = require('../models/post');
const verify = require('./privateRoutes');

router.get('/posts',verify,(req,res)=>{
    post.find((err,data)=>{
        if(!err){
            res.send(data)
        }
        else{
            console.log('error 1')
        }
    })
        .sort({date:-1})    
})
router.post('/posts',verify,(req,res)=>{
    const newpost = new post({
        'title': req.body.title,
        'snippet': req.body.snippet,
        'body': req.body.body
    })
    newpost.save((err,data)=>{
        if(!err){
            res.send(data)
        }
        else{
            console.log('error posts')
        }
    })
})
router.post('/edit/:id',verify,(req,res)=>{
    const newpost = new post({
        'title': req.body.title,
        'snippet': req.body.snippet,
        'body': req.body.body
    })
    newpost.save((err,data)=>{
        if(!err){
            res.send(data)
        }
        else{
            console.log('error edit')
        }
    })
})
router.delete('/posts/:id',verify,(req,res)=>{
    post.deleteOne({ _id:`${req.params.id}`},(data,err)=>{
        if(!err){
            res.status(204).send('Post deleted')
        }
        else{
            console.log('error deleting post')
        }
    })
})

module.exports = router;