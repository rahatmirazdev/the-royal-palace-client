import React from 'react';
import Lottie from 'react-lottie';
import { FaCar, FaBus, FaWalking } from 'react-icons/fa';
import animationData from '../../assets/animation/location.json';

const Location = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };

  return (
    <section className="bg-gray-100 py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">Our Location</h2>
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="md:w-1/2 text-center md:text-left">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">How to Get Here</h3>
            <div className="grid grid-cols-1 gap-4">
              <div className="bg-white p-6 rounded-lg shadow-lg flex items-center">
                <FaCar className="text-blue-500 mr-4" size={32} />
                <div>
                  <h4 className="text-xl font-bold text-gray-800">By Car</h4>
                  <p className="text-gray-700">Take the main highway and exit at the Banani junction. Follow the signs to The Royal Palace Apartments.</p>
                </div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-lg flex items-center">
                <FaBus className="text-blue-500 mr-4" size={32} />
                <div>
                  <h4 className="text-xl font-bold text-gray-800">By Public Transport</h4>
                  <p className="text-gray-700">The nearest bus stop is just a 5-minute walk away. Several bus routes also stop nearby.</p>
                </div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-lg flex items-center">
                <FaWalking className="text-blue-500 mr-4" size={32} />
                <div>
                  <h4 className="text-xl font-bold text-gray-800">By Foot</h4>
                  <p className="text-gray-700">If you're in the Banani area, you can easily walk to our location within 15 minutes.</p>
                </div>
              </div>
            </div>
          </div>
          <div className="md:w-1/2">
            <Lottie options={defaultOptions} height={300} width={300} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Location;