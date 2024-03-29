import { Header } from "../../components/Header/header.js";
import Box from "@mui/material/Box";
import { Login } from "../../components/Login/login.js";
import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { SignUp } from "../../components/SignUp/signup.js";
import { UserProvider } from "../../components/UserContext/usercontext.js";
export const Root = () => {
  const [renderLoginPopup, setRenderLoginPopup] = useState(false);
  const [renderSignupPopup, setRenderSignupPopup] = useState(false);

  return (
    <UserProvider>
      <Box>
        {renderLoginPopup && (
          <Login
            render={renderLoginPopup}
            setRender={setRenderLoginPopup}
            setRenderSignup={setRenderSignupPopup}
          />
        )}
        {renderSignupPopup && (
          <SignUp render={renderSignupPopup} setRender={setRenderSignupPopup} />
        )}
        <Header setRender={setRenderLoginPopup} />
        <Outlet context={setRenderLoginPopup} />
      </Box>
    </UserProvider>
  );
};
