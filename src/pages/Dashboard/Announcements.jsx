import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Announcements = () => {
  const [announcements, setAnnouncements] = useState([]);

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/announcements`);
        setAnnouncements(response.data);
      } catch (error) {
        console.error('Error fetching announcements:', error);
      }
    };

    fetchAnnouncements();
  }, []);

  return (
    <div>
      <h1 className='text-2xl font-bold mb-4 pt-14'>Announcements</h1>
      <div className='space-y-4'>
        {announcements.map((announcement) => (
          <div key={announcement._id} className='p-4 border rounded-md'>
            <h2 className='text-xl font-bold'>{announcement.title}</h2>
            <p>{announcement.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Announcements;