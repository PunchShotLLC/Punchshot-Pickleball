import React, { createContext, useState, useEffect } from "react";

import axios from "axios";
import { useCookies } from "react-cookie";

const UserContext = createContext(null);

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); 

  const [cookies, removeCookie] = useCookies([]);
  useEffect(() => {
    setLoading(true); 
    const verifyCookie = async () => {
      const { data } = await axios.post(
        "http://localhost:8000/users/verify",
        {},
        { withCredentials: true }
      );
      const { status, user } = data;
      console.log(user);
      if (status) {
        setUser(user);
        setLoading(false)
      } else {
        setUser(null);
        setLoading(false)
      }
    };
    verifyCookie();
  }, [cookies, removeCookie]);

  const value = {
    user, 
    loading
  }; 

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
export { UserProvider, UserContext };
