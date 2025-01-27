import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import axiosInstance from './../../hooks/axiosInstance';

const ManageCoupons = () => {
  const [coupons, setCoupons] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [code, setCode] = useState('');
  const [discountPercentage, setDiscountPercentage] = useState('');

  useEffect(() => {
    const fetchCoupons = async () => {
      try {
        const response = await axiosInstance.get('/coupons');
        setCoupons(response.data);
      } catch (error) {
        console.error('Error fetching coupons:', error);
      }
    };

    fetchCoupons();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axiosInstance.post('/coupons', { title, description, code, discountPercentage: parseInt(discountPercentage) });
      toast.success('Coupon created successfully');
      setTitle('');
      setDescription('');
      setCode('');
      setDiscountPercentage('');
      setIsModalOpen(false);
      // Refresh the coupons list
      const response = await axiosInstance.get('/coupons');
      setCoupons(response.data);
    } catch (error) {
      toast.error('Failed to create coupon');
    }
  };

  const handleDeleteCoupon = async (couponId) => {
    try {
      await axios.delete(`/coupons/${couponId}`);
      setCoupons(coupons.filter((coupon) => coupon._id !== couponId));
    } catch (error) {
      console.error('Failed to delete coupon', error);
    }
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-center mt-7">Manage Coupons</h1>
      <table className="min-w-full bg-white overflow-x-scroll">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Title</th>
            <th className="py-2 px-4 border-b">Description</th>
            <th className="py-2 px-4 border-b">Code</th>
            <th className="py-2 px-4 border-b">Discount Percentage</th>
            <th className="py-2 px-4 border-b">Action</th>
          </tr>
        </thead>
        <tbody>
          {coupons.map((coupon) => (
            <tr key={coupon._id}>
              <td className="py-2 px-4 border-b">{coupon.title}</td>
              <td className="py-2 px-4 border-b">{coupon.description}</td>
              <td className="py-2 px-4 border-b">{coupon.code}</td>
              <td className="py-2 px-4 border-b">{coupon.discountPercentage}%</td>
              <td className="py-2 px-4 border-b">
                <button
                  onClick={() => handleDeleteCoupon(coupon._id)}
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
        <button onClick={handleOpenModal} className="mt-3 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mb-4">Add Coupon</button>

      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg relative">
            <button onClick={handleCloseModal} className="absolute top-2 right-2 text-gray-600">&times;</button>
            <h2 className="text-xl font-bold mb-4">Add Coupon</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">Title</label>
                <input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">Description</label>
                <input type="text" id="description" value={description} onChange={(e) => setDescription(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="code">Coupon Code</label>
                <input type="text" id="code" value={code} onChange={(e) => setCode(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="discountPercentage">Discount Percentage</label>
                <input type="number" id="discountPercentage" value={discountPercentage} onChange={(e) => setDiscountPercentage(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required />
              </div>
              <div className="flex items-center justify-between">
                <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Submit</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageCoupons;