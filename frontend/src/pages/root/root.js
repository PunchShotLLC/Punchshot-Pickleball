import { Header } from "../../components/header/header";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { requirePropFactory } from "@mui/material";
import { styled } from "@mui/system";
// import "./home.css";
import { Login } from "../../components/login/login.js";
import React, { useState } from "react";
import { Outlet } from "react-router-dom";

export const Root = () => {
  const [renderLoginPopup, setRenderLoginPopup] = useState(false);

  return (
    <Box>
      <Login render={renderLoginPopup} setRender={setRenderLoginPopup} />
      <Header setRender={setRenderLoginPopup} />
      <Outlet />
    </Box>
  );
};