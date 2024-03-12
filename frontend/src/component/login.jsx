import React from 'react'
import { useState } from 'react'
import axiosInstanse from '../axios'

const Login = () => {

    const [email, setEmail]= useState(null)
    const [password,setPassword] = useState(null)


    const handelSubmit = async (e) => {
            e.preventDefault()
try {
        const response = await axiosInstanse.post("/login",{email,password})
            window.localStorage.setItem("token",response?.data?.accessToken)
            axiosInstanse.defaults.headers(response?.data?.accessToken)
        console.log(response)
} catch (error) {
console.log(error?.response?.data?.message)
}
    }

  return (
    <div>   <form  method="post" onSubmit={handelSubmit}>
    <label for="email">Email</label>
    <input type="text" name='email'  id='email' onChange={(e)=>setEmail(e.target.value)} />

    <label for="password">Password</label>
    <input type="text" name='password' id='password' onChange={(e)=>setPassword(e.target.value)} />

    <button type='submit'>submit</button>
    </form></div>
  )
}

export default Login