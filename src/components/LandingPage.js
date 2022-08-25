import React from 'react';
import { useNavigate } from 'react-router-dom';
import studentswebinar from '../images/landpageimage.png';
import { useEffect } from "react";

const LandingPage = () => {

  const navigate = useNavigate();
  const uId = localStorage.getItem('userId') || 0  

  useEffect(() => {
    if(uId != 0)
      navigate('/home')
  }, []);


  return (
    <div className='LandingPage'>
      <div className='container-fluid text-center p-0 pt-5'>
        <div className='row m-0'>
          <div className='d-none d-lg-block col-lg-6 col-md-0 col-sm-0 col-xs-0'>
            <img src={studentswebinar} className='img-fluid' alt='LandingPage' />
          </div>
          <div className='col-lg-6 col-md-12 col-sm-12 col-xs-12'>
            <div className='d-flex flex-column align-items-center justify-content-center h-100 gap-3'>
              <h1 className='display-5'>Multilingual Education System</h1>
              <h5>The free, fun and effective way of learning English</h5>
              <div class="d-grid gap-2 col-lg-6 col-md-6 col-sm-9 col-xs-9 mx-auto">
                <button class="btn btn-primary" type="button" onClick={() => { navigate("/signup"); }}>GET STARTED</button>
                <button class="btn btn-outline-dark" type="button" onClick={() => { navigate("/login"); }}>ALREADY HAVE AND ACCOUNT</button>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LandingPage