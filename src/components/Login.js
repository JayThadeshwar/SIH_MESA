import React from 'react'
import * as con from '../constants'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import ollp from '../images/online learning login.png';
import TextField from '@mui/material/TextField';

const Login = () => {

  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    var data = {
      "emailId": event.target.email.value,
      "password": event.target.password.value,
    }

    axios.post(con.BASE_URI + '/user/validate', data)
      .then(response => {        
        if (response.data.isValid) {      
          localStorage.setItem('userId', response.data['info'])    
          navigate("/home")
        }
        else
          alert("Invalid credentials");
      }).catch(function (error) {
        console.log(error)
      });

  };

  return (
    <div className="Login">
      <div className="container-fluid">
        <div className="row m-0">
          <div className="d-none d-lg-block col-lg-6 col-md-0 col-sm-0 col-xs-0 d-flex align-items-center justify-content-content">
            <img src={ollp} className="img-fluid w-100" />
          </div>
          <div className="col-lg-6 col-md-12 col-sm-12 col-xs-12 pt-5">
            <div className="d-flex flex-column gap-4 justify-content-center align-items-center h-100">
              <h1 className="font-weight-bold">Welcome</h1>
              <form onSubmit={handleSubmit} className="d-flex flex-column gap-3 w-75">
                <TextField
                  // style={{ width: '80%' }}
                  // margin="normal"
                  required
                  id="email"
                  label="Email ID"
                  name="email"
                />
                <TextField
                  // style={{ width: '80%' }}
                  // margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                />
                <div className='text-center'>
                  <button className="btn btn-outline-primary btn-lg" type="submit">LOGIN</button>
                </div>
              </form>

              <div>
                <p className='lead'>Don't have an account?<Link to="/signup">{" Register"}</Link></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login