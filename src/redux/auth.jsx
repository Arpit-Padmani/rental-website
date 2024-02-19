import { createContext, useContext, useReducer, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const [token,setToken] = useState(localStorage.getItem("token"));

    const storetokenInLS = (serverToken) => {
        return localStorage.setItem("token", serverToken);
    }

    let isloggedIn = !!token;
    console.log(isloggedIn);

    const LogoutUser=()=>{
        setToken("");
        return localStorage.removeItem("token");
    }

    return <AuthContext.Provider value={{ storetokenInLS , LogoutUser , isloggedIn}}>
        {children}
    </AuthContext.Provider>
}

export const useAuth = () => {
    const authContextValue =  useContext(AuthContext);
    return authContextValue;
}