import React, { useEffect, useState } from 'react';
import useAuth from './../../hooks/useAuth';
import LoadingSpinner from './../../components/Shared/LoadingSpinner';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import axiosInstance from './../../hooks/axiosInstance';
import { FaCalendarAlt, FaEnvelope, FaUser, FaBuilding, FaIdCard } from 'react-icons/fa';
import { MdApartment, MdOutlineLocationCity } from 'react-icons/md';
import { BsGraphUp } from 'react-icons/bs';
import { LuUsers } from 'react-icons/lu';

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

  // Common profile header for all user types
  const ProfileHeader = ({ photo, name, email }) => (
    <div className="relative mb-8">
      <div className="h-32 bg-gradient-to-r from-blue-500 to-blue-600 rounded-t-lg"></div>
      <div className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 top-32">
        <div className="w-28 h-28 rounded-full border-4 border-white bg-white shadow-md overflow-hidden">
          {photo ? (
            <img
              src={photo}
              alt={name}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-blue-200 flex items-center justify-center text-3xl text-blue-600">
              {name ? name[0].toUpperCase() : 'U'}
            </div>
          )}
        </div>
      </div>
      <div className="mt-16 text-center">
        <h2 className="text-2xl font-bold text-gray-800">{name}</h2>
        <div className="flex items-center justify-center mt-1 text-gray-600">
          <FaEnvelope className="mr-2" />
          <span>{email}</span>
        </div>
      </div>
    </div>
  );

  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        {userData.role === 'admin' ? (
          <>
            <ProfileHeader
              photo={userData.photoURL}
              name={user.displayName}
              email={userData.email}
            />

            <div className="p-6">
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-700 mb-3 border-b pb-2">
                  <span className="border-b-2 border-blue-500 pb-2">Admin Stats</span>
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-lg border border-blue-200 flex flex-col items-center">
                    <div className="w-12 h-12 bg-blue-500 text-white rounded-full flex items-center justify-center mb-2">
                      <FaBuilding />
                    </div>
                    <p className="text-sm text-gray-600">Total Rooms</p>
                    <p className="text-2xl font-bold text-gray-800">{stats.totalRooms || '0'}</p>
                  </div>

                  <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-lg border border-green-200 flex flex-col items-center">
                    <div className="w-12 h-12 bg-green-500 text-white rounded-full flex items-center justify-center mb-2">
                      <FaUser />
                    </div>
                    <p className="text-sm text-gray-600">Total Users</p>
                    <p className="text-2xl font-bold text-gray-800">{stats.totalUsers || '0'}</p>
                  </div>

                  <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-lg border border-purple-200 flex flex-col items-center">
                    <div className="w-12 h-12 bg-purple-500 text-white rounded-full flex items-center justify-center mb-2">
                      <LuUsers />
                    </div>
                    <p className="text-sm text-gray-600">Total Members</p>
                    <p className="text-2xl font-bold text-gray-800">{memberCount - 1}</p>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            <ProfileHeader
              photo={userData.photoURL}
              name={userData.name}
              email={userData.email}
            />

            <div className="p-6">
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-700 mb-3 border-b pb-2">
                  <span className="border-b-2 border-blue-500 pb-2">Membership Details</span>
                </h3>

                <div className="bg-blue-50 rounded-lg p-4 mb-4 border border-blue-100">
                  <div className="flex items-center mb-3">
                    <div className="w-10 h-10 bg-blue-500 text-white rounded-full flex items-center justify-center mr-4">
                      <FaCalendarAlt />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Agreement Accept Date</p>
                      <p className="font-medium text-gray-800">{userData.agreementAcceptDate || 'None'}</p>
                    </div>
                  </div>
                </div>

                <h3 className="text-lg font-semibold text-gray-700 mb-3 border-b pb-2">
                  <span className="border-b-2 border-blue-500 pb-2">Apartment Information</span>
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 p-4 rounded-lg border border-indigo-200">
                    <div className="flex items-center mb-2">
                      <div className="w-10 h-10 bg-indigo-500 text-white rounded-full flex items-center justify-center mr-3">
                        <MdApartment />
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Floor</p>
                        <p className="font-medium text-gray-800">{userData.rentedApartment?.floor || 'None'}</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-4 rounded-lg border border-orange-200">
                    <div className="flex items-center mb-2">
                      <div className="w-10 h-10 bg-orange-500 text-white rounded-full flex items-center justify-center mr-3">
                        <MdOutlineLocationCity />
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Block</p>
                        <p className="font-medium text-gray-800">{userData.rentedApartment?.block || 'None'}</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-teal-50 to-teal-100 p-4 rounded-lg border border-teal-200">
                    <div className="flex items-center mb-2">
                      <div className="w-10 h-10 bg-teal-500 text-white rounded-full flex items-center justify-center mr-3">
                        <FaIdCard />
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Room No</p>
                        <p className="font-medium text-gray-800">{userData.rentedApartment?.roomNo || 'None'}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default MyProfile;