import React from 'react';
import './App.css';
import Body from './Components/Body';
import {BrowserRouter as Router, Route, Switch, useParams} from 'react-router-dom';
import Create from './Components/Create';
import {useEffect,useState} from 'react';
import axios from 'axios';
import Edit from './Components/Edit.js';
import IndividualPost from './Components/IndividualPost';
import Navbar from './Components/Navbar';
import Register from './Components/Register';
import Login from './Components/Login';
import Cookies from 'js-cookie';

function App() {

  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  

  const submitHandler = (e) => {
    e.preventDefault();
    axios.post('https://postappmern.herokuapp.com/login',{
                email:email,
                password:password
            })
        .then(res=>{
            Cookies.set('authtoken',res.data);
            localStorage.setItem('email',email);
            window.location.replace('/');
            setEmail('');
            setPassword('');
        })
        .catch(err=>alert('Invalid Credentials'));
}
  const token = Cookies.get('authtoken');
  const [getpost,setGetpost] = useState([{title:'',snippet:'',body:''}]);
    useEffect(() => {
        axios.get('https://postappmern.herokuapp.com/posts',{headers: {"authtoken": `${token}`}})
            .then(res => {
              setGetpost(res.data);
            })
            .catch(err=> console.log('getpost err'))
    }, [getpost.title,getpost.snippet,getpost.body]);
    
  return (
      <div className="App">
          <Router>  
          <div className='content'>
            <Switch>
                  <Route exact path='/login'>
                    <Login email={email} password={password} setEmail={setEmail} setPassword={setPassword} submitHandler={submitHandler} />
                  </Route>
                  <Route exact path='/register'>
                    <Register/>
                  </Route>
                  <Route exact path='/edit/:id'>
                      <Navbar/>
                      <Edit getpost={getpost} setGetpost={setGetpost}/>
                  </Route>
                  <Route exact path='/'>
                      <Navbar/>
                      <Body getpost={getpost} setGetpost={setGetpost} email={email}/>
                  </Route>
                  <Route exact path='/create'>
                    <Navbar/>
                    <Create token={token}/>
                  </Route>
                  <Route exact path='/:id'>
                    <Navbar/>
                    <IndividualPost getpost={getpost}/>
                  </Route>
            </Switch>
          </div>
          </Router>
      </div>
  );
}

export default App;
