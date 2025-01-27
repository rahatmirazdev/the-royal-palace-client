import PropTypes from 'prop-types';
import useAuth from '../hooks/useAuth';
import { Navigate, useLocation } from 'react-router-dom';
import LoadingSpinner from '../components/Shared/LoadingSpinner';
import { useEffect, useState } from 'react';
import axios from 'axios';
import axiosInstance from './../hooks/axiosInstance';

const AdminRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const checkAdmin = async () => {
      try {
        const response = await axiosInstance.get(`/users/${user.email}`);
        setIsAdmin(response.data.role === 'admin');
      } catch (error) {
        console.error('Error checking admin role:', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (!loading) {
      checkAdmin();
    }
  }, [loading, user]);

  if (loading || isLoading) return <LoadingSpinner />;
  if (isAdmin) return children;
  return <Navigate to='/login' state={{ from: location }} replace />;
};

AdminRoute.propTypes = {
  children: PropTypes.element.isRequired,
};

export default AdminRoute;