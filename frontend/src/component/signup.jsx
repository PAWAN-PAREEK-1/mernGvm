import React, { useState } from 'react'
import axiosInstanse from '../axios'
import { Navigate, useNavigate } from 'react-router-dom'

const Signup = () => {
    const [email , setEmail]=useState(null)
    const [password , setPassword]=useState(null)
    const [file,setProfile]=useState(null)

const navigate = useNavigate()

    const handelSubmit = async (e) => {
            e.preventDefault()
           try {
            const formData = new FormData()
            formData.append('email',email)
            formData.append('password',password)
            formData.append('file',file)
                    const response = await axiosInstanse.post("/signin", formData, { headers:{"Content-Type": "multipart/form-data"}})
                console.log(response)
                if(response){
                    navigate('/login')
                }
           } catch (error) {
            console.log(error)
           }
    }




  return (
    <div>
        <h1>signup</h1>
        <form onSubmit={handelSubmit}>
        <label for="email">Email</label>
        <input type="text" name='email'  id='email' onChange={(e)=> setEmail(e.target.value)}/>

        <label for="password">Password</label>
        <input type="text" name='password' id='password' onChange={(e)=>setPassword(e.target.value)}/>

        <label for="profile">image</label>
        <input type='file' name="profile" id='profile' onChange={(e)=>setProfile(e.target.files[0])} />

        <button type='submit'>submit</button>
        </form>
    </div>
  )
}

export default Signup