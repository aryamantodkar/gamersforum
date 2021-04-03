import React from 'react';
import {useState,useEffect} from 'react';
import axios from 'axios';
import './Create.css';
import {Link, Redirect} from 'react-router-dom';
import Cookies from 'js-cookie';
function Create(props){
    const [title,setTitle] = useState('');
    const [snippet,setSnippet] = useState('');
    const [body,setBody] = useState('');
    const token = Cookies.get('authtoken');
    const submitHandler = (e) => {
        e.preventDefault();
        axios.post('https://postappmern.herokuapp.com/posts',{
                    title:title,
                    snippet:snippet,
                    body:body,
                },{headers:{"authtoken":`${token}`}})
            .then(res=>{
                setTitle('');
                setSnippet('');
                setBody('');
                window.location.replace('/')
            })
            .catch(err=>console.log(err))
    }
    if(token){
        return(
            <div className='createcontent'>
                <div className='formheader'>
                    <h2>New Post</h2>
                </div>
                <form className='form-create' onSubmit={submitHandler} method='POST'>
                    <div className='container-1'>
                        <label for='title'>Title</label>
                        <input value={title} onChange={(e)=>{
                            setTitle(e.target.value)
                        }} placeholder='Enter Post Title'/>
                    </div>
                    <div className='container-2'>
                        <label for='snippet'>Description</label>
                        <input value={snippet} onChange={(e)=>{
                            setSnippet(e.target.value)
                        }} placeholder='Enter Post Snippet'/>
                    </div>
                    <div className='container-3'>
                        <label for='form-body-create'>Body</label>
                        <textarea value={body} onChange={(e)=>{
                            setBody(e.target.value)
                        }} className='textarea' placeholder='Enter Post Body'/>
                    </div>
                    <div className='container-4'>
                        <button type='submit'>POST</button>
                    </div>
                </form>
            </div>
        )
    }
    else{
        return(
            <div className='loginerror'>
                <div className='loginmessage'>Please Login First</div>
                <span className='loginbtn'><button><a href={'/login'}>Login</a></button></span>
            </div>
        )
    }
}
export default Create;