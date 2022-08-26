import React from 'react';
import ReactDOM from 'react-dom';
import App from './App'; 
import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import {initReactI18next} from "react-i18next";
import HttpApi from "i18next-http-backend";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'

i18n    
    .use(initReactI18next)
    .use(LanguageDetector)
    .use(HttpApi)
    .init({
        supportedLngs: ['en','hi','mr'],
        fallbackLng: "en",
        detection: {
            order: ['localStorage','htmlTag','cookie','path','subdomain'],
            caches: ['localStorage'],
        },
        backend: {
            loadPath: '/assets/locales/{{lng}}/translation.json'
        }
    });
    localStorage.setItem('code', 'en');
ReactDOM.render(
    <App />,
    document.getElementById('root')
);
 