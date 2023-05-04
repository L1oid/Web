import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { buildProvider } from './vm/redux/api.js';

import PageLogin from './view/page/login/page.js';
import PageRegister from './view/page/register/page.js';
import PageMain from './view/page/main/page.js';
import PageHomework from './view/page/homework/page.js';
import PageSLAE from './view/page/slae/page.js';
import PageChat from './view/page/chat/page.js';

const Provider = buildProvider();

const root = ReactDOM.createRoot(document.getElementById('root'));

const pgLogin = ( <PageLogin /> );
const pgRegister = ( <PageRegister /> );
const pgMain = ( <PageMain /> );
const pgHomework = ( <PageHomework /> );
const pgSLAE = ( <PageSLAE />);
const pgChat = ( <PageChat />);

const router = (
  <Provider>
    <BrowserRouter>
      <div>
        <Routes>
          <Route path="/" element={pgLogin} />
          <Route path="/register" element={pgRegister} />
          <Route path="/login" element={pgLogin} />
          <Route path="/main" element={pgMain} />
          <Route path="/homework" element={pgHomework} />
          <Route path="/slae" element={pgSLAE} />
          <Route path="/chat" element={pgChat} />
        </Routes>
      </div>
    </BrowserRouter>
  </Provider>
);

root.render(router);