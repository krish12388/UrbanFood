import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { GoogleOAuthProvider } from '@react-oauth/google';
const GOOGLE_CLIENT_ID= import.meta.env.VITE_GOOGLE_CLIENT_ID
export const authService = "http://localhost:5000"
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <GoogleOAuthProvider clientId="1004970989475-opu4vac61kdk81umorin67luglep5fgo.apps.googleusercontent.com">
    <App />
    </GoogleOAuthProvider>
  </StrictMode>,
)
