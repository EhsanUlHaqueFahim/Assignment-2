import { createBrowserRouter, RouterProvider, Link } from 'react-router-dom'
import Login from './components/auth/Login'
import Signup from './components/auth/Signup'
import Home from './components/Home'
import Jobs from './components/Jobs'
import Companies from './components/Companies'
import Profile from './components/Profile'
import useAuth from './hooks/useAuth'
import React from 'react';

function NotFound() {
  return (
    <div style={{ textAlign: 'center', marginTop: '4rem' }}>
      <h1>404 - Page Not Found</h1>
      <p>The page you are looking for does not exist.</p>
      <Link to="/" style={{ color: '#6A38C2', textDecoration: 'underline' }}>Go to Home</Link>
    </div>
  );
}

function ErrorFallback({ error }) {
  return (
    <div style={{ textAlign: 'center', marginTop: '4rem' }}>
      <h1>Something went wrong!</h1>
      <pre style={{ color: 'red' }}>{error?.message || 'Unknown error'}</pre>
      <Link to="/" style={{ color: '#6A38C2', textDecoration: 'underline' }}>Go to Home</Link>
    </div>
  );
}

const appRouter = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
    errorElement: <ErrorFallback />,
  },
  {
    path: '/login',
    element: <Login />,
    errorElement: <ErrorFallback />,
  },
  {
    path: '/signup',
    element: <Signup />,
    errorElement: <ErrorFallback />,
  },
  {
    path: '/jobs',
    element: <Jobs />,
    errorElement: <ErrorFallback />,
  },
  {
    path: '/companies',
    element: <Companies />,
    errorElement: <ErrorFallback />,
  },
  {
    path: '/profile',
    element: <Profile />,
    errorElement: <ErrorFallback />,
  },
  {
    path: '*',
    element: <NotFound />,
  }
])
//Authentication check
const AppWithAuth = () => {
  useAuth();
  return <RouterProvider router={appRouter} />;
};

function App() {
  return <AppWithAuth />
}

export default App