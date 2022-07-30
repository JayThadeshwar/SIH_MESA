import React from 'react';

import { BrowserRouter as Router, Routes, Route } from  'react-router-dom';
import LandingPage from './LandingPage';
import LogIn from './Login';
import SignUp from './SignUp';
import Home from './HomePage';
import VocabDev from './VocabularyDevelopment';
import SummTrans from './Summarization';
import Grammar from './Grammar';
import Assessment from './Assessment';
import AddChap from './AddChapter';


function App(props) {
  return (
    <Router>
            <Routes>
                <Route path='/' element={<LandingPage />} />
                <Route path='/login' element={<LogIn />} />        
                <Route path='/signup' element={<SignUp/>} />
                <Route path='/home' element={<Home/>} />
                <Route path='/vocabdev' element={<VocabDev/>} />
                <Route path='/summarization' element={<SummTrans/>} />
                <Route path='/grammar' element={<Grammar/>} />
                <Route path='/assessment' element={<Assessment/>} />
                <Route path='/addchapter' element={<AddChap/>} />
            </Routes>
        </Router>
  );
}

export default App;