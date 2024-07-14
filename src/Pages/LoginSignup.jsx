import React, { useState } from 'react'
import './CSS/LoginSignup.css'

export const LoginSignup = () => {

  const [state, setState] = useState("Login");

  const[formData,setFormData] = useState({
    username:"",
    password:"",
    email: "",
  });

  const changeHandle = (e) =>{
    setFormData({...formData,[e.target.name]: e.target.value});
  }

  const login = async () =>{
    console.log("login Function Executed", formData)
    let responseData;

    await fetch('http://localhost:4000/login',{
      method: 'POST',
      headers:{
        Accept:'application/json',
        'Content-Type':'application/json',
      },
      body:JSON.stringify(formData),
    }).then((response)=> response.json()).then((data)=>responseData=data)
    if(responseData.success){
      localStorage.setItem('auth-token',responseData.token);
      window.location.replace("/");
    } else{
      alert(responseData.errors)
    }
    
  }

  const signup = async () =>{
    console.log("SignUp Function Executed", formData)
    let responseData;

    await fetch('http://localhost:4000/signup',{
      method: 'POST',
      headers:{
        Accept:'application/json',
        'Content-Type':'application/json',
      },
      body:JSON.stringify(formData),
    }).then((response)=> response.json()).then((data)=>responseData=data)
    if(responseData.success){
      localStorage.setItem('auth-token',responseData.token);
      window.location.replace("/");
    } else{
      alert(responseData.errors)
    }

  }


  return (
    <div className='loginsignup'>

      <div className="loginsignup-container">

        <h1>{state}</h1>
        <div className="loginsignup-fields">

          {state==="Sign Up"
          ?<input type='text' name='username' value={formData.username} onChange={changeHandle} placeholder='Enter Your Name'/>
          :<></>}
          <input name='email' value={formData.email} onChange={changeHandle} type='email' placeholder='Enter Your Email Address'/>
          <input name='password' value={formData.password} onChange={changeHandle} type='password' placeholder='Enter Your Password'/>
          </div>
          <button onClick={()=>{state==="Login"?login():signup()}}>Continue</button>
          {state==="Sign Up"
          ?<p className='loginsignup-login'>Already Have An Account? <span className='moveright'> Click <span className='clickhere' onClick={()=>{setState("Login")}}>Here</span> to Login</span></p>
          :<p className='loginsignup-login'>Create An Account? <span className='moveright'> Click <span className='clickhere' onClick={()=>{setState("Sign Up")}}>Here</span></span></p>
          }
          <div className="loginsignup-agree">
          <input type='checkbox' name='' id=''/>
          <p>By Continuing, I Agree to the terms of the use of privacy along the coast</p>
          </div>


        </div>

        
      


    </div>
  )
}
