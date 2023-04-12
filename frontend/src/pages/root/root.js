import { Header } from "../../components/header/header";
import Box from "@mui/material/Box";
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