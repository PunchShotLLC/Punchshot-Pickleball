import React from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { Root } from "./pages/root/root";
import { About } from "./pages/about/about";
import { Home } from "./pages/home/home";
import { Leaderboard } from "./pages/leaderboard/leaderboard";
import { Account } from "./pages/Account/account";
import { What } from "./pages/what/what";
import { Login } from "./components/login/login";
import { SignUp } from "./components/SignUp/signup";
import { League } from "./pages/League/league";
import { TeamSelect } from "./pages/Team/team";
import { Matches } from "./pages/Matches/Matches";
import { CreateLeague } from "./components/LeagueComp/CreateLeague";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "what",
        element: <What />,
      },
      {
        path: "leaderboard",
        element: <Leaderboard />,
      },
      {
        path: "leagues",
        element: <League />,
      },
      {
        path: "leagueInfo",
        element: <TeamSelect />,
      },
      {
        path: "account",
        element: <Account />,
      },
      {
        path: "matches",
        element: <Matches />,
      },
    ],
  },

  {
    path: "login",
    element: <Login render={true} />,
  },
  {
    path: "signup",
    element: <SignUp render={true} />,
  },
  {
    path: "createLeague",
    element: <CreateLeague render={true} />,
  },
  {
    path: "*",
    element: <h1>Page not found</h1>,
  },
]);

createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
