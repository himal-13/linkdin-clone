import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Login from './auth/Login.tsx'
import AuthProvider from './context/AuthContext.tsx'
import Profile from './pages/MyProfile.tsx'
import UserProfile from './pages/UserProfile.tsx'


const router = createBrowserRouter([

  {
    path:'/',
    element:<App/>,
    errorElement:<h1>Error APP</h1>

  },
  {
    path:'/login',
    element:<Login/>,
    errorElement:<h1>Error</h1>

  },
  {
    path:'/profile',
    element:<Profile/>,
    errorElement:<h1>Error page</h1>
  },
  {
    path:'/:userId',
    element:<UserProfile/>
  }

])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
   <AuthProvider>
    <RouterProvider router={router}/>
   </AuthProvider>
  </StrictMode>,
)
