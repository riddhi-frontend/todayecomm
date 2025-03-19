import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './css/index.css'
import './css/media.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

// Task-2

// chunk-K6CSEXPM.mjs:5364 Uncaught TypeError: Cannot read properties of undefined (reading 'pathname')