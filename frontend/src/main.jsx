import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { } from "bootstrap/dist/css/bootstrap.css";

import 'bootstrap/dist/js/bootstrap.bundle.min.js'; // <-- Importa el JS aquí

import { AuthProvider } from "./context/AuthContext";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </StrictMode>
)
