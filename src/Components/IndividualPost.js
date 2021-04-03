import React from 'react';
import {useParams} from "react-router-dom";
import './IndividualPost.css';
import Navbar from './Navbar';
import Cookies from 'js-cookie';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
function IndividualPost (props){
    const token = Cookies.get('authtoken');
    let {id} = useParams();
    var object = []
    props.getpost.map(post=>{
        if(post._id===id){
            let title = post.title;
            let snippet = post.snippet;
            let body = post.body;
            object = [title,snippet,body]
        }
    })
    const redirect = () => {
        window.location.replace('/');
    }
    if(token){
        return(
            <div className='main-content'>
                <div className='post-content'>
                    <div className='container-1'>
                        <div className='post-header'>
                            <h1>Title:</h1>
                        </div>
                        <div className='post-title'>
                            <h1>{object[0]}</h1>
                        </div>
                    </div>
                    <div className='container-2'>
                        <div className='post-header'>
                            <h1>Snippet:</h1>
                        </div>
                        <div className='post-snippet'>
                            <h1>{object[1]}</h1>
                        </div>
                    </div>
                    <div className='container-3'>
                        <div className='post-header'>
                            <h1>Body:</h1>
                        </div>
                        <div className='post-body'>
                            <h1>{object[2]}</h1>
                        </div>
                    </div>
                </div>
                <div className='side-content'>
                    <div className='header'>All Posts <ArrowDownwardIcon/></div>
                    <button className='allposts-btn' onClick={redirect}>Homepage</button>
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
export default IndividualPost;