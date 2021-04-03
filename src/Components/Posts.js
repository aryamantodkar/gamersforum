import React from 'react';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import ThumbDownAltIcon from '@material-ui/icons/ThumbDownAlt';
import './Posts.css';
import { IconButton } from '@material-ui/core';
import axios from 'axios';
import {useState} from 'react';
import Cookies from 'js-cookie';
import IndividualPost from './IndividualPost';
const Posts = (props) => {
    const token = Cookies.get('authtoken');
    const deleteHandler = () => {
        props.setGetpost(props.getpost.filter((el) => el._id !== props.post._id));
        axios.delete(`https://postappmern.herokuapp.com/posts/${props.post._id}`,{headers:{"authtoken": `${token}`}})
            .then(data=>console.log('data',data))
            .catch(err=>console.log('error axios'))
    }
    return(
        <div className='Posts'>
            <div className='title'>
                <span><a href={'/' + props.post._id}>{props.title}</a></span>
                <span className='icons'>
                    <IconButton className='edit'>
                        <a href={'/edit/' + props.post._id}><EditIcon style={{color: "rgb(27, 181, 252)"}}/></a>
                    </IconButton>
                    <IconButton className='delete'>
                        <DeleteIcon onClick={deleteHandler} style={{color: "rgb(27, 181, 252)"}}/>
                    </IconButton>
                </span>
            </div>
            <div className='snippet'>Description : {props.snippet}</div>
            <div className='postbody'>{props.body}</div>
        </div>
    )
}
export default Posts;