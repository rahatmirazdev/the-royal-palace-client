import React, { useEffect, useState } from 'react';
import { FaRegCopy, FaCheck, FaTicketAlt, FaTags } from 'react-icons/fa';
import axiosInstance from '../../hooks/axiosInstance';
import { toast } from 'react-hot-toast';

const Coupons = () => {
  const [coupons, setCoupons] = useState([]);
  const [copiedCode, setCopiedCode] = useState(null);
  const [activeIndex, setActiveIndex] = useState(null);

  useEffect(() => {
    const fetchCoupons = async () => {
      try {
        const response = await axiosInstance.get('/coupons');
        // Sort by newest first (assuming _id is MongoDB ObjectId which contains timestamp)
        // and limit to 6 coupons
        const sortedCoupons = response.data
          .sort((a, b) => {
            // If there's a timestamp field, use it for sorting
            if (a.timestamp && b.timestamp) {
              return new Date(b.timestamp) - new Date(a.timestamp);
            }
            // Fallback to _id for sorting (MongoDB ObjectIds contain creation timestamp)
            return b._id.localeCompare(a._id);
          })
          .slice(0, 6); // Limit to 6 coupons
          
        setCoupons(sortedCoupons);
      } catch (error) {
        console.error('Error fetching coupons:', error);
      }
    };

    fetchCoupons();
  }, []);

  const handleCopyCode = (code) => {
    navigator.clipboard.writeText(code)
      .then(() => {
        setCopiedCode(code);
        toast.success('Coupon code copied to clipboard!');
        setTimeout(() => setCopiedCode(null), 2000);
      })
      .catch(err => {
        console.error('Failed to copy: ', err);
        toast.error('Failed to copy code');
      });
  };

  const handleCardHover = (index) => {
    setActiveIndex(index);
  };

  // Coupon colors for variety
  const colors = [
    { bg: 'bg-gradient-to-r from-blue-500 to-blue-600', border: 'border-blue-400', pattern: 'bg-blue-400/20' },
    { bg: 'bg-gradient-to-r from-purple-500 to-purple-600', border: 'border-purple-400', pattern: 'bg-purple-400/20' },
    { bg: 'bg-gradient-to-r from-emerald-500 to-emerald-600', border: 'border-emerald-400', pattern: 'bg-emerald-400/20' },
  ];

  return (
    <section className="py-16 bg-slate-50 relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-100 rounded-full opacity-30 blur-3xl"></div>
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-indigo-100 rounded-full opacity-30 blur-3xl"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center p-1 bg-blue-100 rounded-full mb-4">
            <div className="inline-flex items-center px-4 py-1 bg-blue-600 text-white rounded-full">
              <FaTags className="mr-2" />
              <span className="text-sm font-medium uppercase tracking-wider">Special Offers</span>
            </div>
          </div>
          <h2 className="text-4xl font-bold text-gray-800 mb-4">Exclusive Discount Coupons</h2>
          <p className="max-w-2xl mx-auto text-gray-600">
            Use these special coupon codes to get amazing discounts on your apartment rent. Limited time offers!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {coupons.map((coupon, index) => {
            const colorSet = colors[index % colors.length];
            const isActive = activeIndex === index;

            return (
              <div
                key={coupon._id}
                className={`relative overflow-hidden transition-all duration-300 transform ${isActive ? 'scale-105' : 'scale-100'} shadow-lg rounded-xl`}
                onMouseEnter={() => handleCardHover(index)}
                onMouseLeave={() => handleCardHover(null)}
              >
                {/* Coupon Card */}
                <div className={`${colorSet.bg} p-4 text-white h-full flex flex-col justify-between relative overflow-hidden`}>
                  {/* Decorative dots pattern */}
                  <div className={`absolute top-0 right-0 w-32 h-32 -mr-10 -mt-10 ${colorSet.pattern} rounded-full opacity-50`}></div>
                  <div className={`absolute bottom-0 left-0 w-24 h-24 -ml-10 -mb-10 ${colorSet.pattern} rounded-full opacity-50`}></div>

                  {/* Left side circles for ticket effect */}
                  <div className="absolute -left-3 top-1/2 transform -translate-y-1/2 space-y-3">
                    {[...Array(4)].map((_, i) => (
                      <div key={i} className="w-5 h-5 bg-white rounded-full"></div>
                    ))}
                  </div>

                  <div className="relative z-10">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <span className="inline-block px-2 py-1 bg-white/20 rounded-full text-xs font-semibold backdrop-blur-sm mb-1">
                          {coupon.title}
                        </span>
                        <h3 className="text-2xl font-bold text-white leading-tight">
                          {coupon.discountPercentage}% OFF
                        </h3>
                      </div>
                      <FaTicketAlt className="text-white/80 text-2xl" />
                    </div>
                    <p className="mb-4 text-white/90 text-sm line-clamp-2">{coupon.description}</p>
                  </div>

                  {/* Coupon code box */}
                  <div className="mt-auto relative z-10">
                    <div className={`flex items-center ${colorSet.border} bg-white/10 backdrop-blur-sm border border-dashed rounded-lg p-2 mb-3`}>
                      <div className="flex-grow text-center font-mono text-base font-bold tracking-widest">
                        {coupon.code}
                      </div>
                      <button
                        onClick={() => handleCopyCode(coupon.code)}
                        className="ml-2 text-white bg-white/20 p-1.5 rounded-md hover:bg-white/30 transition-all"
                        title="Copy code"
                      >
                        {copiedCode === coupon.code ? <FaCheck className="text-sm" /> : <FaRegCopy className="text-sm" />}
                      </button>
                    </div>

                    <button className="w-full py-2 bg-white text-gray-800 hover:bg-gray-100 transition-colors rounded-lg font-semibold flex items-center justify-center text-sm">
                      Apply Now
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {coupons.length === 0 && (
          <div className="text-center py-8 bg-white rounded-lg shadow">
            <p className="text-gray-500">No coupons available at the moment. Check back later!</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default Coupons;