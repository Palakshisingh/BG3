// import React, { useState } from 'react';
// import './register.css';
// const Login = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const googleAuth = async (e) => {
//     e.preventDefault();
//     window.location.href = "http://localhost:8000/auth/google";
//   }

//   const handleSubmit = async (e) => {
//     e.preventDefault();
  
//     // Prepare user credentials
//     const userData = {
//       email,
//       password
//     };
  
//     try {
//       // Send user credentials to the server for authentication
//       const response = await fetch("http://localhost:8000/login", {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(userData)
//       });
  
//       // Check if the login request was successful
//       if (!response.ok) {
//         throw new Error('Failed to login');
//       }

//       // If login successful, redirect to the home page
//       window.location.href = "http://localhost:3000/home";
//     } catch (error) {
//       console.error("Error logging in:", error);
//     }
//   };
  
//   return (
//     <div className="lmain">
//       <div className="lregister-box">
//         <h2>Log In</h2>
//         <form className="lform-container">
//           <div className="linput-uep">
//             <input 
//               type='email' 
//               placeholder='Email' 
//               value={email} 
//               onChange={(e) => setEmail(e.target.value)}
//             />
//           </div>
//           <div className="linput-uep">
//             <input 
//               type='password' 
//               placeholder='Password' 
//               value={password} 
//               onChange={(e) => setPassword(e.target.value)}
//             />
//           </div>
//           <div className="lregister-btn">
//             <button type="submit" onClick={handleSubmit}>Submit</button>
//           </div>
//           <div className="google-btn">
//             <button type='button' onClick={googleAuth}>Google</button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Login;

// import React, { useState } from 'react';
// import { registerUser } from '../controllers/authCon';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faGoogle } from '@fortawesome/free-brands-svg-icons';

// const SignUp = () => {
//   const [userName, setUsername] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const googleAuth = async (e) => {
//     e.preventDefault();

//     // Redirect user to OAuth2 authentication route on backend
//     window.location.href = "http://localhost:8000/auth/google";
//   }

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const registrationData = {
//       userName,
//       email,
//       password
//     };

//     try {
//       const response = await registerUser(registrationData);
//       if (response.success === false) {
//         window.location.href = "/"; // Redirect to home page if registration fails
//       } else {
//         window.location.href = "/"; // Redirect to home page if registration is successful
//       }
//     } catch (error) {
//       console.error("Registration failed:", error);
//     }
//   };

//   return (
//     <div className='main'>
      
//       <div className='register-box'>
//         <h2>Sign Up</h2>
//         <div className='form-container'>
//           <form>
//             <div className='input-uep'>
//               <div className='prompt'><p>Username</p></div>
//               <input type='text' value={userName} onChange={(e)=>setUsername(e.target.value)}/>
//             </div>
//             <div className='input-uep'>
//               <div className='prompt'><p>E-mail</p></div>
//               <input type='text' value={email} onChange={(e)=>setEmail(e.target.value)}/>
//             </div>
//             <div className='input-uep'>
//               <div className='prompt'><p>Password</p></div>
//               <input type='password' value={password} onChange={(e)=>setPassword(e.target.value)}/>
//             </div>
//             <div className='register-btn'>
//               <button type='submit' onClick={handleSubmit}>Sign Up</button>
//             </div>
//           </form>
//           <div className='google-btn'>
//             <button type='submit' onClick={googleAuth}>
//               <FontAwesomeIcon icon={faGoogle} /> Sign up with Google
//             </button>
//           </div>
//           <div className='login-btn'>
//             <a href='/login'>Already have an account?</a>
//           </div>
//         </div>
//       </div>
      
//     </div>
//   );
// };
// export default SignUp;
import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import { loginUser } from '../controllers/authCon';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import './register.css';
function Register() {


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
      email,
      password
    };

    try {
      const response = await loginUser(registrationData);
      if (response.success === false) {
        window.location.href = "/"; // Redirect to home page if registration fails
      } else {
        window.location.href = "/home"; // Redirect to home page if registration is successful
      }
    } catch (error) {
      console.error("Registration failed:", error);
    }
  };


  const onFinish = (values) => {
    console.log("Received values of form:", values);
  };

  return (
    <div className='authentication'>
      <div className='authentication-form'>
        <div className='form-title'>Welcome Back</div>
        <form layout='vertical' onSubmit={onFinish}>
          <div className='input-box-title'>
            E-mail
          </div>
          <div className='input-box-uep'>
            <input type='email' value={email} onChange={(e)=>setEmail(e.target.value)} placeholder='xyz@email.com'/>
          </div>
          <div className='input-box-title'>
            Password
          </div>
          <div className='input-box-uep'>
            <input type='-password' value={password} onChange={(e)=>setPassword(e.target.value)} placeholder='password'/>
          </div>
          <button className='primary-button' type='submit' onClick={handleSubmit}>Login</button>
          <div className='google-btn'>
            <button type='submit' onClick={googleAuth}>
              <FontAwesomeIcon icon={faGoogle} /> Login with Google
            </button>
          </div>
          <div className='links'>
            <Link to='/' className='anchor'>Don't have an account? </Link>
          </div>
          <div className='links'>
          <Link to='/ownerR' className='anchor'>Click Here if You are a Partner!</Link>
          </div>
        </form>
      </div>

    </div>
  );
}

export default Register;
