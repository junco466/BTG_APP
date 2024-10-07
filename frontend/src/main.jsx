import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './pages/app'
import './index.css'
import { DataProvider } from './context/MainContext'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <DataProvider>
      <App />
    </DataProvider>
  </StrictMode>,
)
