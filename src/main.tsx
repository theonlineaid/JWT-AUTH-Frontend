import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

import "./index.css";
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
// import RegisterPage from './auth/RegisterPage.tsx';
import LoginPage from './auth/LoginPage.tsx';
import PrivateRoute from './route/PrivateRoute.tsx';
import { AuthProvider } from './context/AuthContext.tsx';
// import Register from './auth/RegisterUser.tsx';
import RegisterPage from './auth/RegisterPage.tsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <PrivateRoute />,
    children: [
      {
        path: "/",
        element: <App />,
      },
    ],
  },
  {
    path: "/auth/register",
    element: <RegisterPage />,
  },
  {
    path: "/auth/login",
    element: <LoginPage />,
  },
]);


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>,
)

