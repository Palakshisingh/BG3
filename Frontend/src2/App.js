import React from 'react'
import { BrowserRouter, Routes , Route} from "react-router-dom" 
import Login from './pages/login'
import Register from './pages/Register'
import Owner from './pages/Owner'



import {Button} from 'antd'
function App() {
  return (
    
    <BrowserRouter> 
    <Routes>
      <Route path='/login' element={<Login />}/>
      <Route path='/register' element={<Register />}/>
      <Route path='/owner' element={<Owner />}/>
    </Routes>
    
    </BrowserRouter>
  );
}

export default App;
