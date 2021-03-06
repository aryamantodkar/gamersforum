import React from 'react';
import {useState,useEffect} from 'react';
import axios from 'axios';
import './Register.css';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import {Link, Redirect} from 'react-router-dom';
function Register(){
    const [name,setName] = useState('');
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    let flag = false;
    const [isvisible,setIsvisible] = useState(false);
    const passwordvisible = () => {
        setIsvisible(!isvisible);
    }
    const redirect = () => {
        window.location.replace('/login');
    }
    const submitHandler = (e) => {
        e.preventDefault();
        axios.post('https://postappmern.herokuapp.com/register',{
                    name:name,
                    email:email,
                    password:password
                })
            .then(res=>{
                window.location.replace('/login');
                setName('');
                setEmail('');
                setPassword('');
            })
            .catch(err=>{
                if(name.length<6){
                    alert('Name should have atleast 6 characters');
                }
                else if(password.length<6){
                    alert('Password should have atleast 6 characters');
                }
                else{
                    axios.get('https://postappmern.herokuapp.com/users')
                        .then(res=>{
                            res.data.map(user =>{
                                if(email===user.email){
                                    alert('Email id is already taken');
                                    flag = true;
                                } 
                            })
                            if(!flag){
                                alert('Please enter a valid email id')
                            }
                        })
                        .catch(err=>{
                            console.log(err);
                        })
                }
            })
    }
    return(
        <div className='register-page'>
            <div className='create-content-register'>
                <div className='form-header-register'>
                    <h2>Register</h2>
                </div>
                <form className='form-register' onSubmit={submitHandler} method='POST' action='/'>
                    <div className='container1-register'>
                        <label for='title-login'>Name</label>
                        <input value={name} onChange={(e)=>{
                            setName(e.target.value)
                        }} placeholder='Enter Your Name'/>
                    </div>
                    <div className='container2-register'>
                        <label for='snippet'>Email</label>
                        <input value={email} onChange={(e)=>{
                            setEmail(e.target.value)
                        }} placeholder='Enter Your Email'/>
                    </div>
                    <div className='container3-register'>
                            <label for='form-body-register'>Password</label>
                            <div className='container-flex-password'>
                                <input value={password} onChange={(e)=>{
                                    setPassword(e.target.value)
                                }} placeholder='Enter Your Password' type={isvisible ? 'text' : 'password'} className='password'/>
                                <span className='visible' onClick={passwordvisible} >{isvisible ? <VisibilityOffIcon  style={{color:"rgb(27, 181, 252)"}}/> : <VisibilityIcon  style={{color:"rgb(27, 181, 252)"}}/> }</span>
                            </div>
                    </div>
                    <span className='container4-register'>
                        <button type='submit' className='button1'>Sign Up</button>
                        <button type='button' className='button2' onClick={redirect}>Sign In</button>
                    </span>
                </form>
            </div>
        </div>
    )
}
export default Register;