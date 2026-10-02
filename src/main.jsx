import React from 'react'
import ReactDOM from 'react-dom/client'
import { HelmetProvider } from 'react-helmet-async'
import App from './App.jsx'
import './index.css'
import { installLeadBeacon } from './lib/leadBeacon'

/* One capture-phase listener covers every React form on the site:
   get-help and all its cat variants, get-deals, contact, sell-privately,
   the situation pages and for-agents. */
installLeadBeacon()

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HelmetProvider>
      <App />
    </HelmetProvider>
  </React.StrictMode>,
)
