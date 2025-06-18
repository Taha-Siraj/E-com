import React, { createContext, useEffect, useReducer, useState } from 'react';
import { reducer } from './Reducer';
export const GlobalContext = createContext(null);
const initialState = {
    user: {},
    isLogin: false,
};
export default function ContextProvider({ children }) {
    const [state, dispatch] = useReducer(reducer, initialState);
    const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userStore = localStorage.getItem("user");
    if (userStore) {
      dispatch({ type: "USER_LOGIN", payload: JSON.parse(userStore) });
    }
    setLoading(false);
  }, []);
    return (
        <GlobalContext.Provider value={{ state, dispatch }}>
            {children}
        </GlobalContext.Provider>
    );
}