import {Button, Form,Input} from 'antd'
import React from 'react'
import { Link } from 'react-router-dom';
import {GoogleLogin} from 'react-google-login';
const clientId = "1006062983371-nb8nu82u0b6jrnj8sgr4t7p82aongrsr.apps.googleusercontent.com";


function Owner() {
    const onFinish = (values)=> {
        console.log("Received values of form:", values);
    };
    const onSuccess = (res) => {
        console.log("LOGIN SUCCESS! Current user: ", res.profileObj);
    }
    const onFailure = (res) => {
        console.log("LOGIN FAILED! res: ", res);
    }
  return (
   <div className= 'authentication'>
<div className='authentication-form card p-3'>
    <h1 className='card-title'> Nice To Meet U</h1>
   <Form layout='vertical' onFinish={onFinish}>
    <Form.Item label='Canteen Name' name='canteenname'>
        <Input placeholder='Canteen Name' />
    </Form.Item>
    <Form.Item label='Business Email' name='businessemail'>
        <Input placeholder='businessxyz@email.com' />
    </Form.Item>
    <Button className='primary-button my-2' htmlType='submit'>OWNER</Button>
    <br/>
    <Link to='/register' className='anchor mt-2'>CLICK HERE TO REGISTER</Link>
    </Form>
    <br/>

    <GoogleLogin
    clientId= {clientId}
    buttonText='Continue with Google'
    onSuccess={onSuccess}
    onFailure={onFailure}
    cookiePolicy={'single_host_origin'}
    isSignedIn={true}
    />
</div>
   </div>
  )
}

export default Owner
