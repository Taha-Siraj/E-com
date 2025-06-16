import React from 'react'
import { initializeApp } from "firebase/app";
import Signup from './Authentication/Signup';
import Login from './Authentication/Login';
import CustomRoutes from './Routes/CustomRoutes';
const App = () => {

  const firebaseConfig = {
    apiKey: "AIzaSyBhoAaRLITdLZMrVLUIDsxWPKKprWVqlpM",
    authDomain: "e-com-f1725.firebaseapp.com",
    projectId: "e-com-f1725",
    storageBucket: "e-com-f1725.firebasestorage.app",
    messagingSenderId: "724169002745",
    appId: "1:724169002745:web:66235f1a23da676df75c28"
  };
  const app = initializeApp(firebaseConfig);
  return (
    <>
    <CustomRoutes/>
  </>
  )
}

export default App
