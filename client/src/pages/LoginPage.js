import React, { useState } from 'react';
//import './login.css';
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const googleAuth = async (e) => {
    e.preventDefault();
    window.location.href = "http://localhost:8000/auth/google";
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Prepare user credentials
    const userData = {
      email,
      password
    };
  
    try {
      // Send user credentials to the server for authentication
      const response = await fetch("http://localhost:8000/login", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
      });
  
      // Check if the login request was successful
      if (!response.ok) {
        throw new Error('Failed to login');
      }

      // If login successful, redirect to the home page
      window.location.href = "http://localhost:3000/home";
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };
  
  return (
    <div className="lmain">
      <div className="lregister-box">
        <h2>Log In</h2>
        <form className="lform-container">
          <div className="linput-uep">
            <input 
              type='email' 
              placeholder='Email' 
              value={email} 
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="linput-uep">
            <input 
              type='password' 
              placeholder='Password' 
              value={password} 
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="lregister-btn">
            <button type="submit" onClick={handleSubmit}>Submit</button>
          </div>
          <div className="google-btn">
            <button type='button' onClick={googleAuth}>Google</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
