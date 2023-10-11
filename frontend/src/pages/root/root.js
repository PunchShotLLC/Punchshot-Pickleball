import { Header } from "../../components/header/header";
import Box from "@mui/material/Box";
import { Login } from "../../components/login/login.js";
import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { SignUp } from "../../components/SignUp/signup";

export const Root = () => {
  const [renderLoginPopup, setRenderLoginPopup] = useState(false);
  const [renderSignupPopup, setRenderSignupPopup] = useState(false);

  return (
    <Box>
      {renderLoginPopup && <Login render={renderLoginPopup} setRender={setRenderLoginPopup} setRenderSignup={setRenderSignupPopup} />}
      {renderSignupPopup && <SignUp render={renderSignupPopup} setRender={setRenderSignupPopup} />}
      <Header setRender={setRenderLoginPopup} />
      <Outlet />
    </Box>
  );
};