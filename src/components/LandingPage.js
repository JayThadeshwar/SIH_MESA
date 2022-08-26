import React from 'react';
import { useNavigate } from 'react-router-dom';
import studentswebinar from '../images/landpageimage.png';
import { useEffect } from "react";
import i18next from 'i18next';
import {useTranslation} from 'react-i18next';
import DropdownButton from 'react-bootstrap/DropdownButton'
import Dropdown from 'react-bootstrap/Dropdown';

const languages = [
  {
    code: 'hi',
    name: 'हिंदी',
    country: 'IN'
  },
  {
    code: 'mr',
    name: 'मराठी',
    country: 'IN'
  },
  {
    code: 'en',
    name: 'English',
    country: 'IN'
  }
]


const LandingPage = () => {
  const {t} = useTranslation()
  const navigate = useNavigate();
  const uId = localStorage.getItem('userId') || 0  

  useEffect(() => {
    if(uId != 0)
      navigate('/home')
  }, []);


  return (
    <div className='LandingPage'>
    <DropdownButton align='end' variant="" style={{paddingRight:20,paddingLeft:10}}>
      {languages.map(({code,name,country_code})=>
      <Dropdown.Item onClick={()=> i18next.changeLanguage(code)}> {name} </Dropdown.Item>)}
    </DropdownButton>
      <div className='container-fluid text-center p-0 pt-5'>
        <div className='row m-0'>
          <div className='d-none d-lg-block col-lg-6 col-md-0 col-sm-0 col-xs-0'>
            <img src={studentswebinar} className='img-fluid' alt='LandingPage' />
          </div>
          <div className='col-lg-6 col-md-12 col-sm-12 col-xs-12'>
            <div className='d-flex flex-column align-items-center justify-content-center h-100 gap-3'>
              <h1 className='display-5'>{t('headline')}</h1>
              <h5>{t('tagline')}</h5>
              <div class="d-grid gap-2 col-lg-6 col-md-6 col-sm-9 col-xs-9 mx-auto">
                <button class="btn btn-primary" type="button" onClick={() => { navigate("/signup"); }}>{t('start')}</button>
                <button class="btn btn-outline-dark" type="button" onClick={() => { navigate("/login"); }}>{t('login')}</button>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LandingPage