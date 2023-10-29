import React, { createContext, useState, useEffect } from 'react'

import axios from "axios";
import { useCookies } from "react-cookie";

const UserContext = createContext(null)

const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [cookies, removeCookie] = useCookies([]);
    useEffect(() => {
        const verifyCookie = async () => {
            const { data } = await axios.post(
                "http://localhost:8000/users/verify",
                {},
                { withCredentials: true }
            );
            const { status, user } = data;
            if (status) {
                setUser(user)
            } else {
                setUser(null)
            }
        }
        verifyCookie();
    }, [cookies, removeCookie]);

    return (
        <UserContext.Provider value={user}>
            {children}
        </UserContext.Provider>
    )
}
export { UserProvider, UserContext } 