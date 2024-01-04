import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase/firebase.Config';
import { Navigate } from 'react-router-dom';
import { useEffect } from 'react';

import MainLayout from './layout/MainLayout';

import Home from './pages/Home';
import Signup from './pages/SIgnup';
import Login from './pages/Login';

import ProtectedRoutes from './components/ProtectedRoutes';
import { useGlobalContext } from './hooks/useGlobalContext';

function App() {

  const { user, dispatch, isAuthChange } = useGlobalContext()

  const routes = createBrowserRouter([
    {
      path: '/',
      element: <ProtectedRoutes user={user}>
        <MainLayout />
      </ProtectedRoutes>,
      children: [
        {
          index: true,
          element: <Home />
        },
      ],
    },
    {
      path: "/login",
      element: <>{user ? <Navigate to='/' /> : <Login />}</>
    },
    {
      path: "/signup",
      element: <>{user ? <Navigate to='/' /> : <Signup />}</>
    },
  ])

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      dispatch({ type: 'LOGIN', payload: user })
      dispatch({ type: 'IS_AUTH_CHANGE' })
    })
  }, [])

  return <>{isAuthChange && <RouterProvider router={routes} />}</>
}

export default App