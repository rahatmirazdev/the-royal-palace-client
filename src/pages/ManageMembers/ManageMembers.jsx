import React, { useEffect, useState } from 'react';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const ManageMembers = () => {
  const axiosSecure = useAxiosSecure();
  const [members, setMembers] = useState([]);

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const response = await axiosSecure.get('/accepted-agreements-users');
        setMembers(response.data);
      } catch (error) {
        console.error('Error fetching members:', error);
      }
    };

    fetchMembers();
  }, [axiosSecure]);

  const handleRemove = async (email) => {
    try {
      const response = await axiosSecure.get('/agreements');
      const agreement = response.data.find(agreement => agreement.userEmail === email && agreement.status === 'accepted');
      if (agreement) {
        await axiosSecure.post(`/agreements/${agreement._id}/pending`);
        setMembers(members.filter(member => member.email !== email));
      }
    } catch (error) {
      console.error('Error setting agreement status to pending:', error);
    }
  };

  const memberCount = members.length;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-center mt-7">Manage Members</h1>
      <p className="text-center mb-4">Total Members: {memberCount}</p>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-2 px-4 border-b">Status</th>
              <th className="py-2 px-4 border-b">Email</th>
              <th className="py-2 px-4 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {members.map(member => (
              <tr key={member._id} className="hover:bg-gray-50">
                <td className="py-2 px-4 border-b">{
                  member.role === 'member' ? 'Accepted' : 'Pending'
                }</td>
                <td className="py-2 px-4 border-b">{member.email}</td>
                <td className="py-2 px-4 border-b">
                  <button
                    onClick={() => handleRemove(member.email)}
                    className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition duration-200"
                  >
                    Remove
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

export default ManageMembers;