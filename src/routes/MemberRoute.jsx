import PropTypes from 'prop-types';
import useAuth from '../hooks/useAuth';
import { Navigate, useLocation } from 'react-router-dom';
import LoadingSpinner from '../components/Shared/LoadingSpinner';
import { useEffect, useState } from 'react';
import axios from 'axios';
import axiosInstance from './../hooks/axiosInstance';

const MemberRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);
  const [isMember, setIsMember] = useState(false);

  useEffect(() => {
    const checkMember = async () => {
      try {
        const response = await axiosInstance.get(`/users/${user.email}`);
        setIsMember(response.data.role === 'member');
      } catch (error) {
        console.error('Error checking member role:', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (!loading) {
      checkMember();
    }
  }, [loading, user]);

  if (loading || isLoading) return <LoadingSpinner />;
  if (isMember) return children;
  return <Navigate to='/login' state={{ from: location }} replace />;
};

MemberRoute.propTypes = {
  children: PropTypes.element.isRequired,
};

export default MemberRoute;