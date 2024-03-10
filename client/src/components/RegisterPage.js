import React, { useState } from 'react';
import { registerUser } from '../controllers/authCon';

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const googleAuth = async (e) => {
    e.preventDefault();

    // Redirect user to OAuth2 authentication route on backend
    window.location.href = "http://localhost:8000/auth/google";
  }

  const goToLogin = async (e) => {
    e.preventDefault();

    // Redirect user to login page
    window.location.href = "/login";
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
    <div className="login-container">
      <div className="login-form-container">
        <div className='heading'>
          <h2>Sign up</h2>
        </div>
        <form>
          <div>
            <input 
              type='text' 
              placeholder='Username' 
              value={username} 
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
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
          <button type='button' onClick={googleAuth}>Sign up with Google</button>
          <h4>OR</h4>
          <button type='button' onClick={goToLogin}>Log in</button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
