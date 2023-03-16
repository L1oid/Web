import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import PageLogin from './view/page/login/page.js';
import PageRegister from './view/page/register/page.js';
import PageMain from './view/page/main/page.js';

const root = ReactDOM.createRoot(document.getElementById('root'));

const pgLogin = ( <PageLogin /> );
const pgRegister = ( <PageRegister /> );
const pgMain = ( <PageMain /> );

const router = (
  <Router>
    <div>
      <Routes>
        <Route path="/" element={pgLogin} />
        <Route path="/register" element={pgRegister} />
        <Route path="/login" element={pgLogin} />
        <Route path="/main" element={pgMain} />
      </Routes>
    </div>
  </Router>
);

root.render(router);