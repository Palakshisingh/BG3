import React, { useState } from 'react';

const OwnerLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userData = {
      email,
      password
    };

    try {
      const response = await fetch("http://localhost:8000/loginOwner", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
      });

      if (!response.ok) {
        throw new Error('Failed to login');
      }

      // Assuming the token is returned in the response body
      const data = await response.json();
      const token = data.token;
      console.log("JWT Token:", token); // Log the token received from the backend

      // Save the token to local storage or cookies
      localStorage.setItem('token', token); // Example: storing in local storage

      window.location.href = "http://localhost:3000/ownerM";
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
        </form>
      </div>
    </div>
  );
};

export default OwnerLogin;
