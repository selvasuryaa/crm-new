import React, { useState } from 'react';
import crmImage from '../ASSETS/crm img.jpg'
import "../CSS/Login.css"
import { useNavigate } from 'react-router-dom'
import Adminservice from '../SERVICES/Adminservice';
// import Authservice from '../SERVICES/Authservice'
// import MiniDrawer from './Drawer';


export default function LoginCard() {
  const navigate = useNavigate();

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const navigateToRegister = () => {
    return navigate('/register')
  }
  const submitHandler = (e) => {
    e.preventDefault();
    console.log(username, password)
    if (username == '' || password == '') {
      alert('Please enter Username and password')
      return
    }
    Adminservice.loginUser({
      username: username,
      password: password
    })
      .then(response => {
        console.log(response)
        if (response.data.status == 0) {
          alert('Wrong Username')
        }
        if (response.data.status == 1) {
          alert('Wrong Password')
        }
        if (response.data.status == 2) {
          alert(`${response.data.msg}`)
          setUsername('')
          setPassword('')
          // localStorage.setItem('islogged', true)
          // Authservice.setToken(response.data.AccessToken)
        }

      })
      .catch(err => {
        console.log(err)
      })

  }

  return (
    <div className='login-wrapper'>
      <div className="login-card">
        <img src={crmImage} alt="Contemplative Reptile" />
        <h1>Login</h1>
        <form>
          <div>
            <label>UserName</label>
            <input type='text' value={username} onChange={(e) => setUsername(e.target.value)} />
          </div>
          <div>
            <label>Password</label>
            <input type='password' value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          <div className='btn-grp'>
            <button id='login' onClick={submitHandler}>Login</button>
            <button id='register' onClick={navigateToRegister}>Register</button>
          </div>
        </form>
      </div >
    </div>
  );
}

// export default Logincard;