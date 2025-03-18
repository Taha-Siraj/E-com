import React, { createContext, useReducer } from 'react';
import { reducer } from './Reducer';

export const GlobalContext = createContext(null);

const initialState = {
    user: {},
    isLogin: null,
    token: null,
};

export default function ContextProvider({ children }) {
    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <GlobalContext.Provider value={{ state, dispatch }}>
            {children}
        </GlobalContext.Provider>
    );
}