import PropTypes from 'prop-types';
import useAuth from '../hooks/useAuth';
import { Navigate, useLocation } from 'react-router-dom';
import LoadingSpinner from '../components/Shared/LoadingSpinner';
import { useEffect, useState } from 'react';
import axios from 'axios';
import axiosInstance from './../hooks/axiosInstance';

const UserRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);
  const [isUser, setIsUser] = useState(false);

  useEffect(() => {
    const checkUser = async () => {
      try {
        const response = await axiosInstance.get(`/users/${user.email}`);
        setIsUser(response.data.role === 'user');
      } catch (error) {
        console.error('Error checking user role:', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (!loading) {
      checkUser();
    }
  }, [loading, user]);

  if (loading || isLoading) return <LoadingSpinner />;
  if (isUser) return children;
  return <Navigate to='/login' state={{ from: location }} replace />;
};

UserRoute.propTypes = {
  children: PropTypes.element.isRequired,
};

export default UserRoute;