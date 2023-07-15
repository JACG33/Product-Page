import React from 'react'
import ReactDOM from 'react-dom/client'
import { AppProvider } from './components/context/AppProvider.jsx'
import { RouterProvider } from 'react-router-dom'
import router from './router/index.jsx'
import "./main.css";

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AppProvider>
      <RouterProvider router={router}/>
    </AppProvider>
  </React.StrictMode>,
)
