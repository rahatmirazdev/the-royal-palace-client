import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import axiosInstance from './../../hooks/axiosInstance';
import { FaTags, FaPlus, FaTrashAlt, FaPercent, FaRegClipboard, FaCheck } from 'react-icons/fa';
import { RiCoupon2Line, RiCouponLine } from 'react-icons/ri';
import { MdClose, MdDescription, MdTitle } from 'react-icons/md';

const ManageCoupons = () => {
  const [coupons, setCoupons] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [code, setCode] = useState('');
  const [discountPercentage, setDiscountPercentage] = useState('');
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(null);
  const [copySuccess, setCopySuccess] = useState(null);

  useEffect(() => {
    fetchCoupons();
  }, []);

  const fetchCoupons = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get('/coupons');
      setCoupons(response.data);
    } catch (error) {
      console.error('Error fetching coupons:', error);
      toast.error('Failed to load coupons');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    // Form validation
    if (!title.trim()) {
      toast.error('Please enter a title');
      return;
    }
    
    if (!description.trim()) {
      toast.error('Please enter a description');
      return;
    }
    
    if (!code.trim()) {
      toast.error('Please enter a coupon code');
      return;
    }
    
    const parsedDiscount = parseInt(discountPercentage);
    if (isNaN(parsedDiscount) || parsedDiscount <= 0 || parsedDiscount > 100) {
      toast.error('Discount percentage must be between 1 and 100');
      return;
    }
    
    try {
      setLoading(true);
      await axiosInstance.post('/coupons', { 
        title, 
        description, 
        code, 
        discountPercentage: parsedDiscount 
      });
      toast.success('Coupon created successfully');
      setTitle('');
      setDescription('');
      setCode('');
      setDiscountPercentage('');
      setIsModalOpen(false);
      fetchCoupons();
    } catch (error) {
      console.error('Failed to create coupon:', error);
      toast.error('Failed to create coupon');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteCoupon = async (couponId, couponTitle) => {
    if (window.confirm(`Are you sure you want to delete the coupon "${couponTitle}"?`)) {
      try {
        setDeleting(couponId);
        await axiosInstance.delete(`/coupons/${couponId}`);
        setCoupons(coupons.filter((coupon) => coupon._id !== couponId));
        toast.success('Coupon deleted successfully');
      } catch (error) {
        console.error('Failed to delete coupon', error);
        toast.error('Failed to delete coupon');
      } finally {
        setDeleting(null);
      }
    }
  };

  const handleCopyCode = (code) => {
    navigator.clipboard.writeText(code)
      .then(() => {
        setCopySuccess(code);
        toast.success('Coupon code copied to clipboard!');
        setTimeout(() => setCopySuccess(null), 2000);
      })
      .catch(err => {
        console.error('Failed to copy: ', err);
        toast.error('Failed to copy code');
      });
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTitle('');
    setDescription('');
    setCode('');
    setDiscountPercentage('');
  };

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-6">
      {/* Header Section */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center">
          <div className="flex items-center mb-4 md:mb-0">
            <div className="bg-amber-100 p-3 rounded-full mr-4">
              <RiCoupon2Line className="text-amber-600 text-xl" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Manage Coupons</h1>
              <p className="text-gray-600 mt-1">Create and manage discount coupons for residents</p>
            </div>
          </div>
          
          <button
            onClick={handleOpenModal}
            className="inline-flex items-center px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-md transition-colors shadow-sm"
          >
            <FaPlus className="mr-2" />
            Add New Coupon
          </button>
        </div>
      </div>

      {/* Coupons Section */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        {loading && !isModalOpen ? (
          <div className="py-20 text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-amber-600 mb-4"></div>
            <p className="text-gray-600">Loading coupons...</p>
          </div>
        ) : coupons.length === 0 ? (
          <div className="py-20 text-center">
            <div className="inline-block bg-gray-100 p-4 rounded-full mb-4">
              <RiCouponLine className="h-10 w-10 text-gray-400" />
            </div>
            <p className="text-gray-600">No coupons found</p>
            <p className="text-sm text-gray-500 mt-2">
              Start by adding a new coupon using the button above
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Coupon Details
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Code
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Discount
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {coupons.map((coupon) => (
                  <tr key={coupon._id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <div className="text-sm font-medium text-gray-900">{coupon.title}</div>
                        <div className="text-sm text-gray-500 mt-1">{coupon.description}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="bg-amber-100 text-amber-800 px-3 py-1 rounded-md font-mono text-sm">
                          {coupon.code}
                        </div>
                        <button
                          onClick={() => handleCopyCode(coupon.code)}
                          className="ml-2 text-gray-500 hover:text-amber-600 transition-colors"
                          title="Copy code"
                        >
                          {copySuccess === coupon.code ? <FaCheck className="text-green-500" /> : <FaRegClipboard />}
                        </button>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="inline-flex items-center bg-green-100 text-green-800 px-2.5 py-0.5 rounded-full text-sm font-medium">
                        <FaPercent className="mr-1 h-3 w-3" />
                        {coupon.discountPercentage}% Off
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={() => handleDeleteCoupon(coupon._id, coupon.title)}
                        disabled={deleting === coupon._id}
                        className={`inline-flex items-center text-white bg-red-500 hover:bg-red-600 px-3 py-2 rounded-md text-sm transition-colors ${
                          deleting === coupon._id ? 'opacity-50 cursor-not-allowed' : ''
                        }`}
                      >
                        {deleting === coupon._id ? (
                          <>
                            <div className="animate-spin h-4 w-4 mr-2 border-2 border-white border-t-transparent rounded-full"></div>
                            Deleting...
                          </>
                        ) : (
                          <>
                            <FaTrashAlt className="mr-1.5" />
                            Delete
                          </>
                        )}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Tips Section */}
      <div className="mt-8 p-5 bg-amber-50 rounded-lg border border-amber-100">
        <h3 className="font-semibold text-amber-800 mb-2 flex items-center">
          <FaTags className="mr-2" />
          Coupon Management Tips
        </h3>
        <ul className="list-disc list-inside text-amber-700 space-y-1 text-sm pl-5">
          <li>Create descriptive coupon titles to make them easily identifiable</li>
          <li>Use simple and memorable coupon codes</li>
          <li>Set reasonable discount percentages based on business needs</li>
          <li>Delete expired or unused coupons to keep the list manageable</li>
        </ul>
      </div>

      {/* Add Coupon Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center border-b border-gray-200 px-6 py-4">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                <RiCouponLine className="mr-2 text-amber-600" />
                Add New Coupon
              </h3>
              <button
                onClick={handleCloseModal}
                className="text-gray-400 hover:text-gray-500 focus:outline-none"
              >
                <MdClose className="h-6 w-6" />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              <div>
                <label htmlFor="title" className="text-sm font-medium text-gray-700 flex items-center">
                  <MdTitle className="mr-2 text-amber-600" />
                  Coupon Title
                </label>
                <input
                  type="text"
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Summer Special Offer"
                  className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500 sm:text-sm p-2 border"
                  required
                />
                <p className="mt-1 text-xs text-gray-500">A memorable title for your coupon</p>
              </div>
              
              <div>
                <label htmlFor="description" className="text-sm font-medium text-gray-700 flex items-center">
                  <MdDescription className="mr-2 text-amber-600" />
                  Coupon Description
                </label>
                <textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="e.g. Get a discount on your monthly rent"
                  rows="3"
                  className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500 sm:text-sm p-2 border"
                  required
                />
                <p className="mt-1 text-xs text-gray-500">Briefly describe what this coupon offers</p>
              </div>
              
              <div>
                <label htmlFor="code" className="text-sm font-medium text-gray-700 flex items-center">
                  <FaRegClipboard className="mr-2 text-amber-600" />
                  Coupon Code
                </label>
                <input
                  type="text"
                  id="code"
                  value={code}
                  onChange={(e) => setCode(e.target.value.toUpperCase())}
                  placeholder="e.g. SUMMER2025"
                  className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500 sm:text-sm p-2 border"
                  required
                />
                <p className="mt-1 text-xs text-gray-500">A unique code for residents to apply the discount</p>
              </div>
              
              <div>
                <label htmlFor="discountPercentage" className="text-sm font-medium text-gray-700 flex items-center">
                  <FaPercent className="mr-2 text-amber-600" />
                  Discount Percentage
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <input
                    type="number"
                    id="discountPercentage"
                    value={discountPercentage}
                    onChange={(e) => setDiscountPercentage(e.target.value)}
                    placeholder="15"
                    min="1"
                    max="100"
                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500 sm:text-sm p-2 border pr-12"
                    required
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <span className="text-gray-500 sm:text-sm">%</span>
                  </div>
                </div>
                <p className="mt-1 text-xs text-gray-500">Percentage discount to be applied (1-100)</p>
              </div>
              
              <div className="pt-4 flex justify-end border-t border-gray-200">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="bg-white border border-gray-300 rounded-md shadow-sm py-2 px-4 mr-3 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-amber-600 text-sm font-medium text-white hover:bg-amber-700 focus:outline-none"
                >
                  {loading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Creating...
                    </>
                  ) : (
                    'Create Coupon'
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageCoupons;