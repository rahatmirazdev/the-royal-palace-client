import React, { useState, useEffect } from 'react';
import axios from 'axios';
import useAuth from '../../hooks/useAuth';

const ManageUsers = () => {
  const { user } = useAuth();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/users`);
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  const handleUpdateRole = async (email, role) => {
    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/users/${email}/role`,
        { role },
        { withCredentials: true }
      );
      setUsers(users.map(user => user.email === email ? { ...user, role } : user));
    } catch (error) {
      console.error('Error updating role:', error);
    }
  };

  if (user.role !== 'admin') {
    return <div>Access Denied</div>;
  }

  return (
    <div>
      <h1 className='text-2xl font-bold mb-4'>Manage Users</h1>
      <table className='min-w-full bg-white'>
        <thead>
          <tr>
            <th className='py-2'>Name</th>
            <th className='py-2'>Email</th>
            <th className='py-2'>Role</th>
            <th className='py-2'>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.email}>
              <td className='py-2'>{user.name}</td>
              <td className='py-2'>{user.email}</td>
              <td className='py-2'>{user.role}</td>
              <td className='py-2'>
                {user.role !== 'admin' && (
                  <button
                    onClick={() => handleUpdateRole(user.email, 'member')}
                    className='bg-blue-500 text-white px-4 py-2 rounded-md'
                  >
                    Make Member
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageUsers;