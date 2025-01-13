import React from 'react';

const Coupons = () => {
  const data = [
    { id: 1, title: "Summer Sale", description: "Get 20% off on all apartments", discount: 20 },
    { id: 2, title: "Winter Special", description: "Enjoy 15% discount on selected apartments", discount: 15 },
    { id: 3, title: "New Year Offer", description: "Flat 25% off for new members", discount: 25 },
  ];

  return (
    <section className="bg-gray-100 py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">Exclusive Coupons</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {data.map((coupon) => (
            <div key={coupon.id} className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">{coupon.title}</h3>
              <p className="text-gray-700 mb-4">{coupon.description}</p>
              <p className="text-lg font-semibold text-blue-500 mb-4">Discount: {coupon.discount}%</p>
              <button className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600">
                Use Coupon
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Coupons;