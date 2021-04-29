import React from 'react';
import {useState,useEffect} from 'react';
import {BrowserRouter as Router, Route, Switch, useParams} from 'react-router-dom';
import axios from 'axios';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import './Login.css';
import {Link, Redirect} from 'react-router-dom';

function Login(props){
    const [isvisible,setIsvisible] = useState(false);
    const passwordvisible = () => {
        setIsvisible(!isvisible);
    }
    const redirect = () => {
        window.location.replace('/register');
    }
    return(
        <div className='create-content-login'>
            <div className='form-header-login'>
                <h2>LOGIN</h2>
            </div>
            <form className='form-login' onSubmit={props.submitHandler} method='POST' action='/'>
                <div className='container2-login'>
                    <label for='snippet'>Email</label>
                    <input value={props.email} onChange={(e)=>{
                        props.setEmail(e.target.value)
                    }} placeholder='Enter Your Email'/>
                </div>
                <div className='container3-login'>
                        <label for='form-body-login'>Password</label>
                        <div className='container-flex-password'>
                            <input value={props.password} onChange={(e)=>{
                                props.setPassword(e.target.value)
                            }} placeholder='Enter Your Password' type={isvisible ? 'text' : 'password'} className='password'/>
                            <span className='visible' onClick={passwordvisible} >{isvisible ? <VisibilityOffIcon style={{color:"rgb(27, 181, 252)"}}/> : <VisibilityIcon style={{color:"rgb(27, 181, 252)"}}/> }</span>
                        </div>
                </div>
                <div className='container4-login'>
                    <button type='submit' className='button1'>Sign In</button>
                    <button type='button' className='button2' onClick={redirect}>Sign Up</button>
                </div>
            </form>
        </div>
    )
}
export default Login;