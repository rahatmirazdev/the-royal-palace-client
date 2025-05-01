import React from 'react';
import { FaCar, FaBus, FaWalking, FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaDirections, FaExternalLinkAlt } from 'react-icons/fa';
import { MdLocationCity, MdMyLocation, MdLocalAirport } from 'react-icons/md';
import Lottie from 'react-lottie';
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
    <section className="bg-gradient-to-b from-gray-50 to-gray-100 py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-3 py-1 text-sm font-semibold text-blue-600 bg-blue-100 rounded-full mb-4">
            PRIME LOCATION
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4 leading-tight">
            Find Us <span className="text-blue-600">Easily</span>
          </h2>
          <div className="w-24 h-1 bg-blue-600 mx-auto mb-8"></div>
          <p className="max-w-2xl mx-auto text-lg text-gray-600">
            The Royal Palace is centrally located in Dhaka's prestigious Banani area, offering convenient access to major business centers, shopping malls, and entertainment venues.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Map and Location Details */}
          <div className="bg-white rounded-xl shadow-xl overflow-hidden">
            <div className="h-[400px] w-full relative">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3651.0105811253483!2d90.40381357597703!3d23.79006418679992!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c70c15010fcb%3A0x6a6c7e6df75fd268!2sBanani%2C%20Dhaka!5e0!3m2!1sen!2sbd!4v1714580100000!5m2!1sen!2sbd"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="The Royal Palace location"
                className="absolute inset-0"
              ></iframe>
            </div>
            <div className="p-6 bg-white">
              <div className="flex items-start space-x-4 mb-4">
                <FaMapMarkerAlt className="text-red-500 text-3xl flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-lg text-gray-900">Our Address</h3>
                  <p className="text-gray-700">Building 12, Road 5, Block A, Banani</p>
                  <p className="text-gray-700">Dhaka 1213, Bangladesh</p>
                </div>
              </div>

              <div className="flex items-start space-x-4 mb-4">
                <FaPhoneAlt className="text-blue-500 text-xl flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-lg text-gray-900">Contact</h3>
                  <p className="text-gray-700">+880 1711-123456</p>
                  <p className="text-gray-700">+880 1811-987654</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <FaEnvelope className="text-blue-500 text-xl flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-lg text-gray-900">Email Us</h3>
                  <p className="text-gray-700">info@royalpalace.com</p>
                  <p className="text-gray-700">support@royalpalace.com</p>
                </div>
              </div>
            </div>
          </div>

          {/* Transportation Options */}
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">How to Reach The Royal Palace</h3>

            <div className="bg-white p-6 rounded-lg shadow-lg transition-transform duration-300 hover:shadow-xl">
              <div className="flex items-center">
                <div className="bg-blue-100 p-3 rounded-full mr-4">
                  <MdLocalAirport className="text-blue-600 text-2xl" />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-gray-800">From Airport</h4>
                  <p className="text-gray-700">Hazrat Shahjalal International Airport is just 9.5 km away. A 25-minute drive via Airport Road will bring you to our doorstep.</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-lg transition-transform duration-300 hover:shadow-xl">
              <div className="flex items-center">
                <div className="bg-blue-100 p-3 rounded-full mr-4">
                  <FaCar className="text-blue-600 text-2xl" />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-gray-800">By Car</h4>
                  <p className="text-gray-700">Take Pragati Sarani or Kazi Nazrul Islam Avenue toward Banani. Turn onto Kemal Ataturk Avenue and follow to Road 5 in Block A. Our building is clearly marked with "The Royal Palace" signage.</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-lg transition-transform duration-300 hover:shadow-xl">
              <div className="flex items-center">
                <div className="bg-blue-100 p-3 rounded-full mr-4">
                  <FaBus className="text-blue-600 text-2xl" />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-gray-800">Public Transport</h4>
                  <p className="text-gray-700">Bus routes 6A, 7B and 9C all stop at Banani Bus Terminal, a convenient 7-minute walk from our location. Ride-sharing services are also readily available throughout the area.</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-lg transition-transform duration-300 hover:shadow-xl">
              <div className="flex items-center">
                <div className="bg-blue-100 p-3 rounded-full mr-4">
                  <MdLocationCity className="text-blue-600 text-2xl" />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-gray-800">Nearby Landmarks</h4>
                  <p className="text-gray-700">We're just 5 minutes from Banani 11 Shopping District, 10 minutes from Gulshan 2 Circle, and 15 minutes from Baridhara Diplomatic Zone.</p>
                </div>
              </div>
            </div>

            <a
              href="https://www.google.com/maps/place/23%C2%B047'50.6%22N+90%C2%B024'11.6%22E/@23.7973788,90.3983561,17z/data=!3m1!4b1!4m13!1m8!3m7!1s0x3755c70c15ea1de1:0x97856381e88fb311!2sBanani,+Dhaka!3b1!8m2!3d23.7936706!4d90.4066082!16s%2Fg%2F11bxfypk48!3m3!8m2!3d23.797374!4d90.403227?hl=en&entry=ttu&g_ep=EgoyMDI1MDQyOC4wIKXMDSoASAFQAw%3D%3D"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center mt-4 px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
            >
              <FaDirections className="mr-2" />
              Get Directions
              <FaExternalLinkAlt className="ml-2 text-sm" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Location;