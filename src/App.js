import React, { Suspense, useState, useEffect } from 'react';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import LogIn from './components/Login';
import SignUp from './components/SignUp';
import Home from './components/HomePage';
import VocabDev from './components/VocabularyDevelopment';
import SummTrans from './components/Summarization';
import Grammar from './components/Grammar';
import Assessment from './components/Assessment';
import AddChap from './components/AddChapter';
import MixMatch from './components/MixMatch';
import BallonGame from './components/FlyingBalloon/Game_page';
import BallonGameOver from './components/FlyingBalloon/Game_Over';
import Chatbot from './components/Chatbot/Chatbot';
import Scenarios from './components/Scenarios';
import "./App.css";
import Logout from './components/Logout';
import AdminHomePage from './components/Admin/AdminHomePage';
import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from "react-i18next";
import HttpApi from "i18next-http-backend";
import { LangContext } from "../src/components/Context/LangContext"
import axios from 'axios';
import { BASE_URI } from "../src/constants"
// import Trials from './components/Trials';
// import HindiTrial from './components/HindiTrial';

i18n
  .use(initReactI18next)
  .use(LanguageDetector)
  .use(HttpApi)
  .init({
    fallbackLng: "en",
    detection: {
      order: ['localStorage', 'htmlTag', 'cookie', 'path', 'subdomain'],
      caches: ['localStorage'],
    },
    backend: {
      loadPath: '/assets/locales/{{lng}}/translation.json'
    }
  });
// NOTE: Dont use this variable by default `i18nextLng` this variable is available
// localStorage.setItem('code', 'en'); 

function App(props) {
  const [langApiData, setLangApiData] = useState([]);
  useEffect(() => {
    axios.get(BASE_URI + "/lang").then((res) => {
      console.log(res.data)
      setLangApiData(res.data)
    }).catch((err) => {
      console.log(err)
    })
    return () => { }
  }, [])

  return (
    <Suspense fallback="loading">
      <LangContext.Provider value={{ langApiData, setLangApiData }}>
        <Router>
          <Routes>
            <Route path='/' element={<LandingPage />} />
            <Route path='/login' element={<LogIn />} />
            <Route path='/signup' element={<SignUp />} />
            <Route path='/home' element={<Home />} />
            <Route path='/vocabdev' element={<VocabDev />} />
            <Route path='/summarization' element={<SummTrans />} />
            <Route path='/grammar' element={<Grammar />} />
            <Route path='/assessment' element={<Assessment />} />
            <Route path='/addchapter' element={<AddChap />} />
            <Route path='/mixmatch' element={<MixMatch />} />
            <Route path='/flyingBalloon' element={<BallonGame />} />
            <Route path='/balloonResult' element={<BallonGameOver />} />
            <Route path='/scenarios' element={<Scenarios />} />
            <Route path='/chatbot' element={<Chatbot />} />
            <Route path='/logout' element={<Logout />} />
            <Route path='/adminhome' element={<AdminHomePage />} />

            {/* <Route path='/trials' element={<Trials />} /> */}
            {/* <Route path='/hindiTrial' element={<HindiTrial />} /> */}
          </Routes>
        </Router>
      </LangContext.Provider>
    </Suspense>
  );
}

export default App;