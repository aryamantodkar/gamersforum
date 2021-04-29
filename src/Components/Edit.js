import React from 'react';
import {useState,useEffect} from 'react';
import {useParams} from "react-router-dom";
import axios from 'axios';
import Navbar from './Navbar';
import Cookies from 'js-cookie';
import './Edit.css';
import {Link, Redirect} from 'react-router-dom';
function Edit(props){
    let {id} = useParams();
    var title;
    var snippet;
    var body;
    const token = Cookies.get('authtoken');
    props.getpost.map(post=>{
        if(post._id===id){
            title = post.title;
            snippet = post.snippet
            body = post.body;
        }
    })
    const deleteHandler = () => {
        props.setGetpost(props.getpost.filter((el) => el._id !== id));
        axios.delete(`https://postappmern.herokuapp.com/posts/${id}`,{headers: {"authtoken": `${token}`}})
            .then(data=>{
                console.log(data)
            })
            .catch(err=>console.log('error axios'))
    }
    const [edittitle,setEdittitle] = useState('');
    const [editsnippet,setEditsnippet] = useState('');
    const [editbody,setEditbody] = useState('');
    useEffect (()=>{
        setEdittitle(title);
        setEditsnippet(snippet);
        setEditbody(body);
    },[title,snippet,body]);
    const submitHandler = (e) => {
        e.preventDefault();
        axios.post('https://postappmern.herokuapp.com/posts',{
                    title:edittitle,
                    snippet:editsnippet,
                    body:editbody,
                },{headers: {"authtoken": `${token}`}})
            .then(res=>{
                setEdittitle('');
                setEditsnippet('');
                setEditbody('');
                window.location.replace('/');
            })
            .catch(err=>console.log(err))
        deleteHandler();
    }
    if(token){
        return(
            <div className='createformcontent'>
                <div className='formheader'>
                    <h2>Edit Post</h2>
                </div>
                <form className='form-create' onSubmit={submitHandler} method='POST' action='/'>
                    <div className='container-1'>
                        <label for='title'>Title</label>
                        <input value={edittitle} onChange={(e)=>{
                            setEdittitle(e.target.value)
                        }} placeholder='Enter Post Title'/>
                    </div>
                    <div className='container-2'>
                        <label for='snippet'>Description</label>
                        <input value={editsnippet} onChange={(e)=>{
                            setEditsnippet(e.target.value)
                        }} placeholder='Enter Post Snippet'/>
                    </div>
                    <div className='container-3'>
                        <label for='form-body'>Body</label>
                        <textarea value={editbody} onChange={(e)=>{
                            setEditbody(e.target.value)
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
export default Edit;