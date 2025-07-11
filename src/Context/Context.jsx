import React, { createContext, useEffect, useReducer, useState } from 'react';
import { reducer } from './Reducer';
import axios from 'axios';

export const GlobalContext = createContext(null);
const initialState = {
    user: {},
    isLogin: false,
    baseUrl: 'https://server-ecom-lac.vercel.app',
    cartCount: 0
};
export default function ContextProvider({ children }) {
    const [state, dispatch] = useReducer(reducer, initialState);
    useEffect(() => {
      const checkLogin = async () => {
        try {
          const res = await axios.get("https://server-ecom-lac.vercel.app/me", {
            withCredentials: true,
          });     
          //http://localhost:5004
      console.log(res.data)
      dispatch({ type: "USER_LOGIN", payload: res.data.user });
    } catch (error) {
      dispatch({ type: "USER_LOGOUT" });
    }
  };

  checkLogin();
}, []);


    return (
        <GlobalContext.Provider value={{ state, dispatch }}>
            {children}
        </GlobalContext.Provider>
    );
}
