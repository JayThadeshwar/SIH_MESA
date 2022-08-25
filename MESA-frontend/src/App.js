import React from 'react';

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
import Chatbot from "./components/Chatbot/Chatbot"
import Scenarios from './components/Scenarios';
import GamePage from './components/FlyingBalloon/Game_page'
import GameOver from './components/FlyingBalloon/Game_Over'


function App(props) {
  return (
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
        <Route path='/chatbot' element={<Chatbot />} />
        <Route path='/scenarios' element={<Scenarios />} />
        <Route path='/flyingballoon' element={<GamePage />} />
        <Route path="/balloonresult" element={<GameOver />}> </Route>


      </Routes>
    </Router>
  );
}

export default App;