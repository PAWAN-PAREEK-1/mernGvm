import React, { useState } from 'react'
import axiosInstanse from '../axios'
import "../styles/signin.css"
import { Navigate, useNavigate } from 'react-router-dom'
// import { Col, Button, Row, Container, Card, Form } from "react-bootstrap";
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBIcon
}
from 'mdb-react-ui-kit';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";

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

    const [justifyActive, setJustifyActive] = useState('tab1');;

  const handleJustifyClick = (value) => {
    if (value === justifyActive) {
      return;
    }

    setJustifyActive(value);
  };





  return (
    <div>
        {/* <h1>signup</h1>
        <form onSubmit={handelSubmit}>
        <label for="email">Email</label>
        <input type="text" name='email'  id='email' onChange={(e)=> setEmail(e.target.value)}/>

        <label for="password">Password</label>
        <input type="text" name='password' id='password' onChange={(e)=>setPassword(e.target.value)}/>

        <label for="profile">image</label>
        <input type='file' name="profile" id='profile' onChange={(e)=>setProfile(e.target.files[0])} />

        <button type='submit'>submit</button>
        </form> */}

<MDBContainer fluid>

      <MDBRow className='d-flex justify-content-center align-items-center h-100'>
        <MDBCol col='12'>

          <MDBCard className='bg-dark text-white my-5 mx-auto' style={{borderRadius: '1rem', maxWidth: '400px'}}>
            <MDBCardBody className='p-5 d-flex flex-column align-items-center mx-auto w-100'>

              <h2 className="fw-bold mb-2 text-uppercase">Login</h2>
              <p className="text-white-50 mb-5">Please enter your login and password!</p>

              <MDBInput wrapperClass='mb-4 mx-5 w-100' labelClass='text-white' label='Email address' id='formControlLg' type='email' size="lg"/>
              <MDBInput wrapperClass='mb-4 mx-5 w-100' labelClass='text-white' label='Password' id='formControlLg' type='password' size="lg"/>

              <p className="small mb-3 pb-lg-2"><a class="text-white-50" href="#!">Forgot password?</a></p>
              <MDBBtn outline className='mx-2 px-5' color='white' size='lg'>
                Login
              </MDBBtn>

              <div className='d-flex flex-row mt-3 mb-5'>
                <MDBBtn tag='a' color='none' className='m-3' style={{ color: 'white' }}>
                  <MDBIcon fab icon='facebook-f' size="lg"/>
                </MDBBtn>

                <MDBBtn tag='a' color='none' className='m-3' style={{ color: 'white' }}>
                  <MDBIcon fab icon='twitter' size="lg"/>
                </MDBBtn>

                <MDBBtn tag='a' color='none' className='m-3' style={{ color: 'white' }}>
                  <MDBIcon fab icon='google' size="lg"/>
                </MDBBtn>
              </div>

              <div>
                <p className="mb-0">Don't have an account? <a href="#!" class="text-white-50 fw-bold">Sign Up</a></p>

              </div>
            </MDBCardBody>
          </MDBCard>

        </MDBCol>
      </MDBRow>

    </MDBContainer>
    </div>
  )
}

export default Signup