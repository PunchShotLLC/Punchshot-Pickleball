import React from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { About } from "./pages/about/about";
import { Home } from "./pages/home/home";
import { Play } from "./pages/play/play";
import { Tournaments } from "./pages/tournaments/tournaments";
import { Account } from "./pages/Account/account";
import { What } from "./pages/what/what";
import { Login } from "./components/login/login";
import { SignUp } from "./components/SignUp/signup";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "account",
    element: <Account />,
  },
  {
    path: "about",
    element: <About />,
  },
  {
    path: "play",
    element: <Play />,
  },
  {
    path: "tournaments",
    element: <Tournaments />,
  },
  {
    path: "what",
    element: <What />,
  },
  {
    path: "login",
    element: <Login render={true} />,
  },
  {
    path: "signup",
    element: <SignUp render={true} />,
  },
]);

createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
