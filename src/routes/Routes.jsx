import { createBrowserRouter, Navigate } from 'react-router-dom';
import Home from '../pages/Home/Home';
import ErrorPage from '../pages/ErrorPage';
import Login from '../pages/Login/Login';
import SignUp from '../pages/SignUp/SignUp';
import MainLayout from '../layouts/MainLayout';
import Apartments from '../pages/AllApartments/Apartments';
import DashboardLayout from '../layouts/DashboardLayout';
import MyProfile from '../pages/Profile/MyProfile';
import MakeAnnouncement from './../pages/MakeAnnouncement/MakeAnnouncement';
import Announcements from './../pages/Announcements/Announcements';
import ManageMembers from '../pages/ManageMembers/ManageMembers';
import AgreementRequests from './../pages/AgreementRequests/AgreementRequests';
import ManageCoupons from './../pages/ManageCoupons/ManageCoupons';
import MakePayment from './../pages/MakePayment/MakePayment';
import PrivateRoute from './PrivateRoute';
import UserRoute from './UserRoute';
import MemberRoute from './MemberRoute';
import AdminRoute from './AdminRoute';

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
    element: <PrivateRoute><DashboardLayout /></PrivateRoute>,
    children: [
      {
        path: '',
        element: <Navigate to="/dashboard/my-profile" replace />,
      },
      {
        path: '/dashboard/my-profile',
        element: <MyProfile />,
      },
      {
        path: '/dashboard/make-announcement',
        element: <AdminRoute><MakeAnnouncement /></AdminRoute>,
      },
      {
        path: '/dashboard/announcements',
        element: <Announcements />,
      },
      {
        path: '/dashboard/manage-members',
        element: <AdminRoute><ManageMembers /></AdminRoute>,
      },
      {
        path: '/dashboard/agreement-requests',
        element: <AdminRoute><AgreementRequests /></AdminRoute>,
      },
      {
        path: '/dashboard/manage-coupons',
        element: <AdminRoute><ManageCoupons /></AdminRoute>,
      },
      {
        path: '/dashboard/make-payment',
        element: <MemberRoute><MakePayment /></MemberRoute>,
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