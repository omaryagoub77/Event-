import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { HashRouter } from 'react-router-dom'
import Preloader from './components/Preloader'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HashRouter basename="/Event-">
      <Preloader />
      <App />
    </HashRouter>
  </StrictMode>,
)