import { createContext, useEffect, useState } from "react";

export const UserContext = createContext();

export default function UserContextProvider({children}) {
    const [userToken, setUserToken] = useState(localStorage.getItem("token")??"");
    useEffect(() => {
        if (localStorage.getItem("userToken")) {
          setUserToken(localStorage.getItem("userToken"));
        }
      }, []);

    return (
        <UserContext.Provider value={{ userToken, setUserToken }}>
            {children}
        </UserContext.Provider>
    );
}