import React from 'react';
import { useQuery } from '@tanstack/react-query';
import axiosInstance from './../../hooks/axiosInstance';
import LoadingSpinner from './../../components/Shared/LoadingSpinner';

const fetchAnnouncements = async () => {
  const { data } = await axiosInstance.get('/announcements');
  return data;
};

const Announcements = () => {
  const { data, error, isLoading } = useQuery({
    queryKey: ['announcements'],
    queryFn: fetchAnnouncements,
  });

  if (isLoading) return <LoadingSpinner />;
  if (error) return <div>Faild to load announcements</div>;

  return (
    <div className="mx-3">
      <div className='max-w-4xl mx-auto p-6 bg-white border border-blue-500 rounded-lg mt-10'>
        <h1 className="text-3xl font-bold mb-6 text-center">Announcements</h1>
        <ul className="space-y-4">
          {data.map((announcement) => (
            <li key={announcement._id} className="p-4 bg-gray-100 rounded-lg shadow">
              <h2 className="text-2xl font-semibold mb-2">{announcement.title}</h2>
              <p className="text-lg">{announcement.description}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Announcements;