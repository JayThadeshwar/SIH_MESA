import React,{Suspense} from 'react';

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


function App(props) {
  return (
    <Suspense fallback="loading">
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
      </Routes>
    </Router>
    </Suspense>
  );
}

export default App;