import React from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import './index.css';
import reportWebVitals from './reportWebVitals';
import { About } from './pages/About/about.js';
import { Home } from './pages/Home/home.js';
import { Play } from './pages/Play/play.js';
import { Tournaments } from './pages/Tournaments/tournaments.js';
import { What } from './pages/What/what.js';
import { Login } from './components/login/login.js'
import { Account } from './pages/Account/account';
import { SignUp } from './components/SignUp/signup.js';


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
  },
  {
    path:"login",
    element: <Login render={true}/>
  },
  {
    path:"signup",
    element: <SignUp render={true}/>
  }
]);

createRoot(document.getElementById("root")).render(
  <RouterProvider router={router}/>
)


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
