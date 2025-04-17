import React from 'react'
import Routes from './pages/Routes'
import { initializeApp } from "firebase/app";
import Login from './pages/Login';
import Signup from './pages/Signup';
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
    <Routes/>
  {/* <Login/> */}
  {/* <Signup/> */}
  </>
  )
}

export default App
