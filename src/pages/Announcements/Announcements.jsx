import React from 'react';
import { useQuery } from '@tanstack/react-query';
import axiosInstance from './../../hooks/axiosInstance';
import LoadingSpinner from './../../components/Shared/LoadingSpinner';
import { MdAnnouncement } from 'react-icons/md';
import { motion } from 'framer-motion';

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
  if (error) return (
    <div className="max-w-4xl mx-auto p-8 text-center">
      <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded">
        <p className="text-red-700">Failed to load announcements. Please try again later.</p>
      </div>
    </div>
  );

  // Animation variants for list items
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1, y: 0,
      transition: {
        type: "spring",
        stiffness: 80,
        damping: 10
      }
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-6">
      <div className="mb-8 text-center">
        <div className="inline-block p-3 rounded-full bg-blue-100 text-blue-600 mb-3">
          <MdAnnouncement size={28} />
        </div>
        <h1 className="text-3xl font-bold text-gray-800">Building Announcements</h1>
        <p className="text-gray-600 mt-2">Stay updated with the latest news and announcements from The Royal Palace management</p>
      </div>

      {data.length === 0 ? (
        <div className="text-center p-8 bg-gray-50 rounded-lg border border-gray-200">
          <p className="text-gray-600">No announcements available at this time.</p>
        </div>
      ) : (
        <motion.ul
          className="space-y-6"
          variants={container}
          initial="hidden"
          animate="show"
        >
          {data.map((announcement) => (
            <motion.li
              key={announcement._id}
              variants={item}
              className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-shadow duration-300"
            >
              <div className="p-5">
                <h2 className="text-xl font-semibold mb-3 text-gray-800">{announcement.title}</h2>

                <div className="prose max-w-none text-gray-600">
                  <p>{announcement.description}</p>
                </div>

                <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between items-center">
                  <span className="text-sm font-medium text-blue-600">Royal Palace Management</span>
                  <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">Official</span>
                </div>
              </div>
            </motion.li>
          ))}
        </motion.ul>
      )}
    </div>
  );
};

export default Announcements;