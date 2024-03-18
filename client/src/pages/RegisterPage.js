import React, { useState } from 'react';
import { registerUser } from '../controllers/authCon';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const googleAuth = async (e) => {
    e.preventDefault();

    // Redirect user to OAuth2 authentication route on backend
    window.location.href = "http://localhost:8000/auth/google";
  }

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
          <div className='google-btn'>
            <button type='submit' onClick={googleAuth}>
              <FontAwesomeIcon icon={faGoogle} /> Sign up with Google
            </button>
          </div>
          <div className='login-btn'>
            <a href='/login'>Already have an account?</a>
          </div>
        </div>
      </div>
      
    </div>
  );
};

export default SignUp;
