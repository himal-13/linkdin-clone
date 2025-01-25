import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Login from './auth/Login.tsx'
import AuthProvider from './context/AuthContext.tsx'


const router = createBrowserRouter([

  {
    path:'/',
    element:<App/>


  },
  {
    path:'/login',
    element:<Login/>,
    errorElement:<h1>Error</h1>

  },

])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
   <AuthProvider>
    <RouterProvider router={router}/>
   </AuthProvider>
  </StrictMode>,
)
