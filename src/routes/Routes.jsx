import { createBrowserRouter } from 'react-router-dom';
import Home from '../pages/Home/Home';
import ErrorPage from '../pages/ErrorPage';
import Login from '../pages/Login/Login';
import SignUp from '../pages/SignUp/SignUp';
import MainLayout from '../layouts/MainLayout';
import Apartments from '../pages/AllApartments/Apartments';
import PrivateRoute from './PrivateRoute';
import DashboardLayout from '../pages/Dashboard/DashboardLayout';
import MyProfile from '../pages/Dashboard/MyProfile';
import Announcements from '../pages/Dashboard/Announcements';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/apartments',
        element: <Apartments />,
      },
    ],
  },
  {
    path: '/dashboard',
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      {
        path: 'profile',
        element: <MyProfile />,
      },
      {
        path: 'announcements',
        element: <Announcements />,
      },
    ],
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/signup',
    element: <SignUp />,
  },
]);