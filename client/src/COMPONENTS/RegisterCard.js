import React, { useState } from 'react';
import crmImage from '../ASSETS/crm img.jpg';
import { useNavigate } from 'react-router-dom'
import "../CSS/Register.css"
import Adminservice from '../SERVICES/Adminservice';




export default function RegisterCard() {

  const navigate = useNavigate();

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const submitHandler = (e) => {
    e.preventDefault();
    console.log(username, password)
    if (username == '' || password == '') {
      alert('Please enter Username and password')
      return
    }

    Adminservice.registerUser({
      username: username,
      password: password
    })
      .then(res => {
        if (res.data.status == 1) {
          setUsername('')
          setPassword('')
          alert('Registration success')
          navigate('/login')
        }
        if (res.data.status == 2) {
          alert('username Exist')
          return
        }
        if (res.data.status == 0) {
          alert('Not Registered')
          return
        }

      })
      .catch(err => {
        console.log(err)
      })
  }

  const navigateToLogin = () => {
    return navigate('/login')

  }

  return (
    <div className='register-wrapper'>

      <div className="register-card">
        <img src={crmImage} alt='crm image' />
        <h1>Register</h1>
        <form>
          <div>
            <label htmlFor='name'> Username</label>
            <input name="username" id='name' value={username} onChange={(e) => setUsername(e.target.value)} />
          </div>
          <div>
            <label htmlFor='pw'> Password</label>
            <input type="password" id='pw' value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          <div className='btn-grp'>
            <button id='register' onClick={submitHandler}>Register</button>
            <button id='login' onClick={navigateToLogin}>Login</button>
          </div>
        </form>
      </div>
    </div>
  );
}
