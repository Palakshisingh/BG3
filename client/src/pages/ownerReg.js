import React, { useState } from 'react';
import { registerUser } from '../controllers/authCon';

//import "./register.css";
//import bg from "./register-bg.png";
const OwnerReg = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const registrationData = {
      username,
      email,
      password
    };

    try {
      const response = await registerUser(registrationData);
      if (response.success === false) {
        window.location.href = "/"; // Redirect to home page if registration fails
      } else {
        window.location.href = "/home"; // Redirect to home page if registration is successful
      }
    } catch (error) {
      console.error("Registration failed:", error);
    }
  };

  return (
    <div className='main'>
      
      <div className='register-box'>
        <h2>Sign Up</h2>
        <div className='form-container'>
          <form>
            <div className='input-uep'>
              <div className='prompt'><p>Username</p></div>
              <input type='text' value={username} onChange={(e)=>setUsername(e.target.value)}/>
            </div>
            <div className='input-uep'>
              <div className='prompt'><p>E-mail</p></div>
              <input type='text' value={email} onChange={(e)=>setEmail(e.target.value)}/>
            </div>
            <div className='input-uep'>
              <div className='prompt'><p>Password</p></div>
              <input type='password' value={password} onChange={(e)=>setPassword(e.target.value)}/>
            </div>
            <div className='register-btn'>
              <button type='submit' onClick={handleSubmit}>Sign Up</button>
            </div>
          </form>
          <div className='login-btn'>
            <a href='/login'>Already have an account?</a>
          </div>
        </div>
      </div>
      
    </div>
  );
};

export default OwnerReg;
