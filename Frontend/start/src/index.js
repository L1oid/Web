import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import PageLogin from './view/page/login/page.js';
import PageRegister from './view/page/register/page.js';
import PageMain from './view/page/main/page.js';
import PageHomework from './view/page/homework/page.js';
import PageChat from './view/page/chat/page.js';

const root = ReactDOM.createRoot(document.getElementById('root'));

const pgLogin = ( <PageLogin /> );
const pgRegister = ( <PageRegister /> );
const pgMain = ( <PageMain /> );
const pgHomework = ( <PageHomework /> );
const pgChat = ( <PageChat />);

const router = (
  <Router>
    <div>
      <Routes>
        <Route path="/" element={pgLogin} />
        <Route path="/register" element={pgRegister} />
        <Route path="/login" element={pgLogin} />
        <Route path="/main" element={pgMain} />
        <Route path="/homework" element={pgHomework} />
        <Route path="/chat" element={pgChat} />
      </Routes>
    </div>
  </Router>
);

root.render(router);