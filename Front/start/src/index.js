import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


//import App from './App';

import PageStart from './gui/page/start/page.js';
import PageTimer from './gui/page/timer/page.js';


const root = ReactDOM.createRoot(document.getElementById('root'));


const id = {value:100};

console.log('Before react rendering...');
/*
root.render(
  <React.StrictMode>
    <App />  
    <PageStart id={id} />  
    <PageTimer id={{value:id.value+3}} />
  </React.StrictMode>  
);
*/


const pgStart = ( <PageStart id={id} /> );
const pgTimer = ( <PageTimer id={{value:id.value+3}} /> );
const router = (
  <Router>
    <div>
      <Routes>
        <Route path="/" element={pgTimer} />
        <Route path="/start" element={pgStart} />
        <Route path="/timer" element={pgTimer} />
        <Route path="*" element={pgStart} />
      </Routes>
    </div>
  </Router>
);
root.render(router);


