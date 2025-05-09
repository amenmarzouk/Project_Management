import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from "react-router";
import ProjectProvider from './context/Project_context.jsx';


import 'primereact/resources/themes/lara-light-indigo/theme.css'; //theme
createRoot(document.getElementById('root')).render(

  <BrowserRouter>
  <ProjectProvider>
  <App />
  </ProjectProvider>
</BrowserRouter>

)
