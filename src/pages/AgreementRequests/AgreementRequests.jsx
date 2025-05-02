import React, { useState, useEffect } from 'react';
import axiosInstance from '../../hooks/axiosInstance';
import { toast } from 'react-hot-toast';
import { FaUserCheck, FaUserTimes, FaBuilding, FaCalendarAlt, FaDollarSign } from 'react-icons/fa';
import { BsHouseDoorFill, BsListCheck } from 'react-icons/bs';
import { MdOutlineApartment, MdOutlineEmail } from 'react-icons/md';

const AgreementRequests = () => {
  const [agreementRequests, setAgreementRequests] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [processingId, setProcessingId] = useState(null);

  const getAgreementRequests = async () => {
    try {
      setLoading(true);
      // Using existing endpoints instead of new one that's causing 404 errors
      const [agreementsResponse, usersResponse] = await Promise.all([
        axiosInstance.get('/agreements', { withCredentials: true }),
        axiosInstance.get('/users', { withCredentials: true })
      ]);

      // Filter to get only pending agreements
      const pendingAgreements = agreementsResponse.data.filter(
        agreement => agreement.status === 'pending'
      );

      // Create a map of email to user details for faster lookup
      const userMap = {};
      usersResponse.data.forEach(user => {
        userMap[user.email] = user;
      });

      // Enhance agreement data with user details from userMap
      const enhancedAgreements = pendingAgreements.map(agreement => {
        const user = userMap[agreement.userEmail] || {};
        return {
          ...agreement,
          userDetails: {
            name: user.name || agreement.userName || "Unknown User",
            photoURL: user.photoURL || null,
            timestamp: user.timestamp || Date.now()
          }
        };
      });

      setAgreementRequests(enhancedAgreements);
      setUsers(usersResponse.data);
    } catch (error) {
      console.error('Error fetching agreement requests:', error);
      toast.error('Failed to load agreement requests');
    } finally {
      setLoading(false);
    }
  };

  const handleAccept = async (id, userName) => {
    if (window.confirm(`Are you sure you want to accept ${userName}'s agreement request?`)) {
      setProcessingId(id);
      try {
        await axiosInstance.post(`/agreements/${id}/accept`, {}, { withCredentials: true });
        toast.success(`${userName}'s agreement was accepted successfully`);
        setAgreementRequests(agreementRequests.filter(request => request._id !== id));
      } catch (error) {
        console.error('Error accepting agreement request:', error);
        toast.error('Failed to accept agreement');
      } finally {
        setProcessingId(null);
      }
    }
  };

  const handleReject = async (id, userName) => {
    if (window.confirm(`Are you sure you want to reject ${userName}'s agreement request?`)) {
      setProcessingId(id);
      try {
        await axiosInstance.delete(`/agreements/${id}`, { withCredentials: true });
        toast.success(`${userName}'s agreement was rejected successfully`);
        setAgreementRequests(agreementRequests.filter(request => request._id !== id));
      } catch (error) {
        console.error('Error rejecting agreement request:', error);
        toast.error('Failed to reject agreement');
      } finally {
        setProcessingId(null);
      }
    }
  };

  useEffect(() => {
    getAgreementRequests();
  }, []);

  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0
    }).format(amount);
  };

  // Format date with proper handling for invalid dates
  const formatDate = (dateString) => {
    try {
      const date = new Date(dateString);
      if (isNaN(date)) {
        return 'Invalid date';
      }
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    } catch (error) {
      console.error('Error formatting date:', error);
      return 'Invalid date';
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-6">
      {/* Header Section */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center">
          <div className="flex items-center mb-4 md:mb-0">
            <div className="bg-purple-100 p-3 rounded-full mr-4">
              <BsListCheck className="text-purple-600 text-xl" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Agreement Requests</h1>
              <p className="text-gray-600 mt-1">Manage apartment agreement requests from users</p>
            </div>
          </div>
          <div className="flex items-center bg-purple-50 text-purple-600 px-4 py-2 rounded-md">
            <span className="font-semibold">{agreementRequests.length} Pending Requests</span>
          </div>
        </div>
      </div>

      {/* Requests Section */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        {loading ? (
          <div className="py-20 text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600 mb-4"></div>
            <p className="text-gray-600">Loading agreement requests...</p>
          </div>
        ) : agreementRequests.length === 0 ? (
          <div className="py-20 text-center">
            <div className="inline-block bg-gray-100 p-4 rounded-full mb-4">
              <BsListCheck className="h-10 w-10 text-gray-400" />
            </div>
            <p className="text-gray-600">No pending agreement requests found</p>
            <p className="text-sm text-gray-500 mt-2">
              All agreement requests have been processed
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    User
                  </th>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Apartment Details
                  </th>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Request Date
                  </th>
                  <th scope="col" className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {agreementRequests.map((request) => (
                  <tr key={request._id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        {request.userDetails?.photoURL ? (
                          <div className="flex-shrink-0 h-10 w-10">
                            <img
                              className="h-10 w-10 rounded-full object-cover"
                              src={request.userDetails.photoURL}
                              alt={request.userDetails.name || "User"}
                            />
                          </div>
                        ) : (
                          <div className="flex-shrink-0 h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center">
                            <span className="text-purple-600 font-medium text-sm">
                              {request.userDetails?.name ? request.userDetails.name.charAt(0).toUpperCase() : "U"}
                            </span>
                          </div>
                        )}
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {request.userDetails?.name || request.userName || "Unknown User"}
                          </div>
                          <div className="text-sm text-gray-500 flex items-center mt-1">
                            <MdOutlineEmail className="mr-1 text-gray-400" />
                            {request.userEmail}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex flex-col">
                        <div className="flex items-center mb-1">
                          <BsHouseDoorFill className="mr-2 text-purple-500" />
                          <span className="text-sm font-medium">Block {request.blockName}, Floor {request.floorNo}</span>
                        </div>
                        <div className="flex items-center mb-1">
                          <MdOutlineApartment className="mr-2 text-blue-500" />
                          <span className="text-sm">Apartment #{request.apartmentNo}</span>
                        </div>
                        <div className="flex items-center">
                          <FaDollarSign className="mr-2 text-green-500" />
                          <span className="text-sm font-medium">{formatCurrency(request.rent)} /month</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div className="flex items-center text-sm text-gray-500">
                        <FaCalendarAlt className="mr-2 text-gray-400" />
                        {formatDate(request.requestDate)}
                      </div>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end space-x-2">
                        <button
                          onClick={() => handleAccept(request._id, request.userDetails?.name || request.userName || request.userEmail)}
                          disabled={processingId === request._id}
                          className={`inline-flex items-center text-white bg-green-500 hover:bg-green-600 px-3 py-2 rounded-md text-sm transition duration-200 ${processingId === request._id ? 'opacity-70 cursor-wait' : ''}`}
                        >
                          {processingId === request._id ? (
                            <>
                              <div className="animate-spin h-4 w-4 mr-2 border-2 border-white border-t-transparent rounded-full"></div>
                              Processing...
                            </>
                          ) : (
                            <>
                              <FaUserCheck className="mr-1.5 h-4 w-4" />
                              Accept
                            </>
                          )}
                        </button>
                        <button
                          onClick={() => handleReject(request._id, request.userDetails?.name || request.userName || request.userEmail)}
                          disabled={processingId === request._id}
                          className={`inline-flex items-center text-white bg-red-500 hover:bg-red-600 px-3 py-2 rounded-md text-sm transition duration-200 ${processingId === request._id ? 'opacity-70 cursor-wait' : ''}`}
                        >
                          {processingId === request._id ? (
                            <>
                              <div className="animate-spin h-4 w-4 mr-2 border-2 border-white border-t-transparent rounded-full"></div>
                              Processing...
                            </>
                          ) : (
                            <>
                              <FaUserTimes className="mr-1.5 h-4 w-4" />
                              Reject
                            </>
                          )}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Info Section */}
      <div className="mt-8 p-5 bg-purple-50 rounded-lg border border-purple-100">
        <h3 className="font-semibold text-purple-800 mb-2 flex items-center">
          <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"></path>
          </svg>
          Agreement Request Information
        </h3>
        <ul className="list-disc list-inside text-purple-700 space-y-1 text-sm pl-5">
          <li>Accepting an agreement will change the user's role to "member"</li>
          <li>Rejecting an agreement will remove the request and keep the user's role unchanged</li>
          <li>Members will gain access to payment features and member-only content</li>
          <li>Once processed, requests will be removed from this list</li>
        </ul>
      </div>
    </div>
  );
};

export default AgreementRequests;