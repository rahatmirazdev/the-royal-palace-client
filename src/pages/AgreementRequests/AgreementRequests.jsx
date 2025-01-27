import React, { useState, useEffect } from 'react';
import axiosInstance from '../../hooks/axiosInstance';
import { toast } from 'react-hot-toast';

const AgreementRequests = () => {
  const [agreementRequests, setAgreementRequests] = useState([]);

  const getAgreementRequests = async () => {
    try {
      const response = await axiosInstance.get('/agreements', { withCredentials: true });
      setAgreementRequests(response.data);
    } catch (error) {
      console.error('Error fetching agreement requests:', error);
    }
  };

  const handleAccept = async (id) => {
    try {
      await axiosInstance.post(`/agreements/${id}/accept`, {}, { withCredentials: true });
      toast.success('Agreement accepted successfully');
      setAgreementRequests(agreementRequests.filter(request => request._id !== id));
    } catch (error) {
      console.error('Error accepting agreement request:', error);
    }
  };

  const handleReject = async (id) => {
    try {
      await axiosInstance.delete(`/agreements/${id}`, { withCredentials: true });
      toast.success('Agreement rejected and removed successfully');
      setAgreementRequests(agreementRequests.filter(request => request._id !== id));
    } catch (error) {
      console.error('Error rejecting agreement request:', error);
    }
  };

  useEffect(() => {
    getAgreementRequests();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Agreement Requests</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-2 px-4 border-b">Name</th>
              <th className="py-2 px-4 border-b">Email</th>
              <th className="py-2 px-4 border-b">Floor No</th>
              <th className="py-2 px-4 border-b">Block Name</th>
              <th className="py-2 px-4 border-b">Room No</th>
              <th className="py-2 px-4 border-b">Rent</th>
              <th className="py-2 px-4 border-b">Agreement Request Date</th>
              <th className="py-2 px-4 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {agreementRequests.map((request) => (
              <tr key={request._id} className="hover:bg-gray-50">
                <td className="py-2 px-4 border-b">{request.userName}</td>
                <td className="py-2 px-4 border-b">{request.userEmail}</td>
                <td className="py-2 px-4 border-b">{request.floorNo}</td>
                <td className="py-2 px-4 border-b">{request.blockName}</td>
                <td className="py-2 px-4 border-b">{request.apartmentNo}</td>
                <td className="py-2 px-4 border-b">{request.rent}</td>
                <td className="py-2 px-4 border-b">{new Date(request.requestDate).toLocaleDateString()}</td>
                <td className="py-2 px-4 border-b">
                  <button
                    onClick={() => handleAccept(request._id)}
                    className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition duration-200"
                  >
                    Accept
                  </button>
                  <button
                    onClick={() => handleReject(request._id)}
                    className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition duration-200 ml-2"
                  >
                    Reject
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AgreementRequests;