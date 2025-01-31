import React, { useEffect, useState } from 'react';
import useAuth from './../../hooks/useAuth';
import LoadingSpinner from './../../components/Shared/LoadingSpinner';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import axiosInstance from './../../hooks/axiosInstance';

const MyProfile = () => {
  const { user, loading } = useAuth();
  const [userData, setUserData] = useState({});
  const [members, setMembers] = useState([]);
  const [stats, setStats] = useState({});


  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axiosInstance.get(`/users/${user.email}`);
        setUserData(response.data);
      } catch (error) {
        toast('Error fetching user:', error);
      }
    };

    if (!loading) {
      fetchUserData();
    }
  }, [loading, user]);


  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const response = await axiosInstance.get('/users');
        setMembers(response.data);
      } catch (error) {
        console.error('Error fetching members:', error);
      }
    };

    fetchMembers();
  }, []);


  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axiosInstance.get('/database-stats');
        setStats(response.data);
      } catch (error) {
        console.error('Error fetching database statistics:', error);
      }
    };

    fetchStats();
  }, []);

  if (loading) return <LoadingSpinner />;
  const memberCount = members.filter(member => member.role === 'member').length;

  
  return (
    userData.role === 'admin' ? (
      <div className="md:w-[500px] mx-auto p-6 bg-white rounded-lg mt-5 border border-blue-300">
        <h1 className="text-3xl font-bold mb-6 text-center">My Profile</h1>
        <div className="flex flex-col items-center">
          <img
            className="w-32 h-32 rounded-full mb-4"
            src={userData.photoURL}
            alt="User Profile"
          />
          <p className="text-xl font-semibold mb-2">Name: {user.displayName}</p>
          <p className="text-lg mb-2">Email: {userData.email}</p>
          <div className="text-lg mb-2">
            <p className="font-semibold">Database Info:</p>
            <ul className="list-disc list-inside">
              <li>Total number of rooms: {stats.totalRooms || 'N/A'}</li>
              <li>Number of users: {stats.totalUsers || 'N/A'}</li>
              <li>Number of members: {memberCount}</li>
            </ul>
          </div>
        </div>
      </div>
    ) : (
      <div className="md:w-[500px] mx-auto p-6 bg-white rounded-lg mt-5 border border-blue-300">
        <h1 className="text-3xl font-bold mb-6 text-center">My Profile</h1>
        <div className="flex flex-col items-center">
          <img
            className="w-32 h-32 rounded-full mb-4"
            src={userData.photoURL}
            alt="User Profile"
          />
          <p className="text-xl font-semibold mb-2">Name: {userData.name}</p>
          <p className="text-lg mb-2">Email: {userData.email}</p>
          <p className="text-lg mb-2">
            Agreement Accept Date: {userData.agreementAcceptDate || 'none'}
          </p>
          <div className="text-lg mb-2">
            <p className="font-semibold">Rented Apartment Info:</p>
            <ul className="list-disc list-inside">
              <li>Floor: {userData.rentedApartment?.floor || 'none'}</li>
              <li>Block: {userData.rentedApartment?.block || 'none'}</li>
              <li>Room No: {userData.rentedApartment?.roomNo || 'none'}</li>
            </ul>
          </div>
        </div>
      </div>
    )
  );
};

export default MyProfile;