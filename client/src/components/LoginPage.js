import React, { useState } from 'react';
import { loginUser } from '../controllers/authCon';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const googleAuth = async (e) => {
    e.preventDefault();

    window.location.href = "http://localhost:3000/auth/google";
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const Data = {
      email,
      password
    };

    try {
      const response = await loginUser(Data);
      if(response.success === false){
        window.location.href = "/login";
      }
      else{
        window.location.href = "/home";
      }
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <div className="login-container">
      <div className="login-form-container">
        <div className='heading'>
          <h2>Log In</h2>
        </div>
        <form>
          <div>
            <input 
              type='email' 
              placeholder='Email' 
              value={email} 
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <input 
              type='password' 
              placeholder='Password' 
              value={password} 
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" onClick={handleSubmit}>Submit</button>
          <h4>OR</h4>
          <button type='button' onClick={googleAuth}>Google</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
