import { useState, useEffect } from 'react';
import one from '../../assets/images/banner/one.jpg';
import two from '../../assets/images/banner/two.jpg';
import three from '../../assets/images/banner/three.jpg';

const images = [one, two, three];

const Banner = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="relative container mx-auto h-[80vh] bg-cover bg-center "
      style={{ backgroundImage: `url(${images[currentImageIndex]})` }}
    >
      <div className="absolute inset-0 bg-black opacity-70"></div>
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-2 md:px-0">
        <h1 className="text-white text-4xl font-bold mb-4">Welcome to The Royal Palace</h1>
        <p className="text-white text-lg max-w-2xl mb-4">
          Experience the epitome of luxury and comfort in our state-of-the-art building.
          Our management system ensures a seamless living experience with top-notch amenities
          and services tailored to meet your needs.
        </p>
        <div className="flex space-x-4">
          <button className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600">
            Learn More
          </button>
          <button className="bg-gray-200 text-blue-500 px-6 py-2 rounded-md border border-blue-500 hover:bg-gray-300">
            Contact Us
          </button>
        </div>
      </div>
    </div>
  );
};

export default Banner;