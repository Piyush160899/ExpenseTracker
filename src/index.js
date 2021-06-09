/* eslint-disable no-unused-vars */
import React from 'react';
import ReactDOM from 'react-dom';
import { SpeechProvider } from '@speechly/react-client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';

ReactDOM.render(    
    <SpeechProvider appId="31996958-7466-44c4-a167-c9cecdfea343" language="en-US">
        <BrowserRouter>
            <App/>
        </BrowserRouter>
    </SpeechProvider>, 
    document.getElementById('root')
);
