import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import reportWebVitals from './reportWebVitals';
import HomePage from './components/HomePage'
import RegisterPage from './components/RegisterPage'
import LoginPage from './components/LoginPage';
import PaymentSuccess from './components/success';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
   <BrowserRouter>
      <Routes>
        <Route path='' element={<RegisterPage />}/>
        <Route path='login' element={<LoginPage />}/>
        <Route path='home' element={<HomePage />}/>
        <Route path="success" element={<PaymentSuccess />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();