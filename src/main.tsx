import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import  'bootstrap/dist/css/bootstrap.css'
import  'bootstrap/dist/js/bootstrap.min.js'
import { AuthProvider } from './authentication/AuthContext.tsx';
import {ErrorProvider} from "./components/ErrorContext.tsx";
import './index.css'

import App from './App.tsx'
// TODO StrictMode严格模式在开发结束后可以注释关闭

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <ErrorProvider>
          <AuthProvider>
              <App />
          </AuthProvider>
      </ErrorProvider>
  </StrictMode>
)
