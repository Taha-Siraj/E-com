import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ContextProvider from './Context/Context.jsx'


const queryClient = new QueryClient();
createRoot(document.getElementById('root')).render(
   
   <ContextProvider>
   <QueryClientProvider client={queryClient}>
   <BrowserRouter>
   <App />
   </BrowserRouter>
   </QueryClientProvider>
   </ContextProvider>
  
)
