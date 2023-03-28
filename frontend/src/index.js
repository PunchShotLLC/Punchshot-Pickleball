import React from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import './index.css';
import reportWebVitals from './reportWebVitals';
import { About } from './pages/about/About';
import { Home } from './pages/home/Home';
import { Play } from './pages/play/Play';
import { Tournaments } from './pages/tournaments/Tournaments';
import { Account } from './pages/Account/account';
import { What } from './pages/what/What';

const router  = createBrowserRouter([
  {
    path: "/",
    element: <Home/>,
  },
  {
    path: "account",
    element: <Account/>
  },
  {
    path: "about",
    element: <About/>
  },
  {
    path: "play",
    element: <Play/>
  },
  {
    path: "tournaments",
    element: <Tournaments/>
  },
  {
    path: "what",
    element: <What/>
  }
]);

createRoot(document.getElementById("root")).render(
  <RouterProvider router={router}/>
)


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
