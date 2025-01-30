import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import  'bootstrap/dist/css/bootstrap.css'
import  'bootstrap/dist/js/bootstrap.min.js'
import { AuthProvider } from './authentication/AuthContext.tsx';
import './index.css'

import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <AuthProvider>
          <App />
      </AuthProvider>
  </StrictMode>,
)
