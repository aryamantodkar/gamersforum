import React from 'react';
import './Body.css';
import InboxIcon from '@material-ui/icons/Inbox';
import PostAddIcon from '@material-ui/icons/PostAdd';
import { IconButton } from '@material-ui/core';
import Posts from './Posts';
import Cookies from 'js-cookie';
import axios from 'axios';
function Body(props){
    function compare(a, b) {
        const timeA = a.createdAt;
        const timeB = b.createdAt;
        let comparison = 0;
        if (timeA > timeB) {
            comparison = 1;
        } else if (timeA < timeB) {
            comparison = -1;
        }
        return comparison * -1 ;
    }
    let name;
    const token = Cookies.get('authtoken');
    axios.get('https://postappmern.herokuapp.com/users')
        .then((res) =>{
            res.data.map(user=>{
                let email = localStorage.getItem('email');
                if(user.email===email){
                    localStorage.setItem('name',user.name);
                }
            })
        })
        if(token){
            return(
                <div className='Body'>
                    <div className='Sidebar'>
                        <div className='name'><h4>Welcome to the GamersForum</h4>
                        {
                            props.getpost.map(post => {
                                return <li> <h4 style={{display: 'inline',color:"rgb(27, 181, 252)"}}>{post.title}</h4></li>
                            })
                        }
                        </div>
                    </div>
                    <div className='Mainbody'>
                        <div className='header'>
                            <span className='header-span'><h1>Posts <InboxIcon/></h1> </span>
                            <span className='header-span2'><h1>New Post <IconButton href={'/create'}><PostAddIcon style={{color: "white"}}/></IconButton></h1></span>
                        </div>
                        {props.getpost.sort(compare).map(post=>{
                            return(
                                <Posts getpost={props.getpost} setGetpost={props.setGetpost} post={post} title = {post.title} snippet = {post.snippet} body = {post.body}/>
                            )
                        })}
                    </div>
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
export default Body;
