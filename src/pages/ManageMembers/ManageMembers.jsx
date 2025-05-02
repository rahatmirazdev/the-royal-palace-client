import React, { useEffect, useState } from 'react';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { HiOutlineUsers, HiOutlineUserRemove } from 'react-icons/hi';
import { FaCheck, FaClock, FaSearch } from 'react-icons/fa';
import { BiFilterAlt } from 'react-icons/bi';
import { toast } from 'react-hot-toast';

const ManageMembers = () => {
  const axiosSecure = useAxiosSecure();
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        setLoading(true);
        const response = await axiosSecure.get('/accepted-agreements-users');
        setMembers(response.data);
      } catch (error) {
        console.error('Error fetching members:', error);
        toast.error('Failed to load members');
      } finally {
        setLoading(false);
      }
    };

    fetchMembers();
  }, [axiosSecure]);

  const handleRemove = async (email, name) => {
    if (window.confirm(`Are you sure you want to remove ${name || email} from members?`)) {
      try {
        const response = await axiosSecure.get('/agreements');
        const agreement = response.data.find(agreement => agreement.userEmail === email && agreement.status === 'accepted');
        if (agreement) {
          await axiosSecure.post(`/agreements/${agreement._id}/pending`);
          setMembers(members.filter(member => member.email !== email));
          toast.success(`${name || email} has been removed from members`);
        }
      } catch (error) {
        console.error('Error setting agreement status to pending:', error);
        toast.error('Failed to remove member');
      }
    }
  };

  const filteredMembers = members.filter(member => {
    const matchesSearch = member.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.email.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === 'all' ||
      (statusFilter === 'member' && member.role === 'member') ||
      (statusFilter === 'pending' && member.role !== 'member');

    return matchesSearch && matchesStatus;
  });

  const memberCount = members.length;
  const filteredCount = filteredMembers.length;

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-6">
      {/* Header Section */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">Manage Members</h1>
            <p className="text-gray-600">
              Total Members: <span className="font-semibold text-blue-600">{memberCount}</span>
              {filteredCount !== memberCount && (
                <span className="ml-2 text-sm">
                  (Filtered: <span className="font-semibold">{filteredCount - 1}</span>)
                </span>
              )}
            </p>
          </div>

          <div className="mt-4 md:mt-0 flex items-center space-x-2">
            <div className="inline-flex items-center bg-blue-50 text-blue-600 px-4 py-2 rounded-md">
              <HiOutlineUsers className="mr-2 h-5 w-5" />
              <span className="font-semibold">{memberCount} Members</span>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filter Section */}
      <div className="mb-6 flex flex-col md:flex-row gap-4">
        <div className="relative flex-grow">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FaSearch className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search by name or email..."
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="flex items-center">
          <div className="mr-2">
            <BiFilterAlt className="h-5 w-5 text-gray-500" />
          </div>
          <select
            className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={statusFilter}
            onChange={e => setStatusFilter(e.target.value)}
          >
            <option value="all">All Status</option>
            <option value="member">Member</option>
            <option value="pending">Pending</option>
          </select>
        </div>
      </div>

      {/* Members Table */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        {loading ? (
          <div className="py-20 text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mb-4"></div>
            <p className="text-gray-600">Loading members...</p>
          </div>
        ) : filteredMembers.length === 0 ? (
          <div className="py-20 text-center">
            <div className="inline-block bg-gray-100 p-4 rounded-full mb-4">
              <HiOutlineUsers className="h-10 w-10 text-gray-400" />
            </div>
            <p className="text-gray-600">No members found</p>
            {searchTerm && (
              <p className="text-sm text-gray-500 mt-2">
                Try adjusting your search or filter criteria
              </p>
            )}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    User
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Email
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredMembers.map(member => (
                  <tr key={member._id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          {member.photoURL ? (
                            <img className="h-10 w-10 rounded-full object-cover" src={member.photoURL} alt={member.name || "User"} />
                          ) : (
                            <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                              <span className="text-blue-600 font-medium text-sm">
                                {member.name ? member.name.charAt(0).toUpperCase() : "U"}
                              </span>
                            </div>
                          )}
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {member.name || "Anonymous User"}
                          </div>
                          <div className="text-sm text-gray-500">
                            Joined {new Date(member.timestamp || Date.now()).toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {member.role === 'member' ? (
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                          <FaCheck className="mr-1 h-3 w-3 mt-0.5" /> Member
                        </span>
                      ) : (
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                          <FaClock className="mr-1 h-3 w-3 mt-0.5" /> Pending
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {member.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={() => handleRemove(member.email, member.name)}
                        className="inline-flex items-center text-white bg-red-500 hover:bg-red-600 px-3 py-2 rounded-md text-sm transition duration-200"
                      >
                        <HiOutlineUserRemove className="mr-1.5 h-4 w-4" />
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageMembers;