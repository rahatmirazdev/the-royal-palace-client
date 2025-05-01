import React, { useState } from 'react';
import useFetchData from '../../hooks/useFetchData';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import axiosInstance from '../../hooks/axiosInstance';
import LoadingSpinner from '../../components/Shared/LoadingSpinner';
import { toast, ToastContainer } from 'react-toastify';
import { FaBuilding, FaCity, FaMapMarkerAlt, FaDollarSign, FaSearch, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const Apartments = () => {
  const [page, setPage] = useState(1);
  const [minRentInput, setMinRentInput] = useState('');
  const [maxRentInput, setMaxRentInput] = useState('');
  const [minRent, setMinRent] = useState('');
  const [maxRent, setMaxRent] = useState('');
  const { user } = useAuth();
  const navigate = useNavigate();

  const { data, isLoading, isError, error, refetch } = useFetchData(
    'apartments',
    `/apartments?page=${page}&minRent=${minRent}&maxRent=${maxRent}`
  );

  const handleAgreement = async (apartment) => {
    if (!user) {
      navigate('/login');
      return;
    }

    try {
      const response = await axiosInstance.post('/apartments/agreement', {
        userName: user.displayName,
        userEmail: user.email,
        floorNo: apartment.floorNo,
        blockName: apartment.blockName,
        apartmentNo: apartment.apartmentNo,
        rent: apartment.rent,
        status: 'pending',
        requestDate: new Date().toISOString(),
      });
      toast.success('Agreement request submitted successfully!');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Something went wrong');
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setMinRent(minRentInput);
    setMaxRent(maxRentInput);
    setPage(1);
    refetch();
  };

  if (isLoading) return <LoadingSpinner />;
  if (isError) return (
    <div className="container mx-auto px-4 py-16 text-center">
      <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative" role="alert">
        <strong className="font-bold">Error: </strong>
        <span className="block sm:inline">{error.message}</span>
      </div>
    </div>
  );

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <ToastContainer position="top-right" autoClose={3000} />

      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Luxury Apartments</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover premium living spaces tailored to your needs. Find your perfect apartment with our comprehensive search options.
          </p>
        </div>

        {/* Search Form */}
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6 mb-12">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Find Your Ideal Apartment</h2>
          <form onSubmit={handleSearch} className="flex flex-col md:flex-row items-center gap-4">
            <div className="w-full md:w-2/5">
              <label htmlFor="min-rent" className="block text-sm font-medium text-gray-700 mb-1">Minimum Rent (BDT)</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaDollarSign className="text-gray-400" />
                </div>
                <input
                  id="min-rent"
                  type="number"
                  placeholder="5000"
                  value={minRentInput}
                  onChange={(e) => setMinRentInput(e.target.value)}
                  className="pl-10 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md py-2 px-4 border focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            <div className="w-full md:w-2/5">
              <label htmlFor="max-rent" className="block text-sm font-medium text-gray-700 mb-1">Maximum Rent (BDT)</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaDollarSign className="text-gray-400" />
                </div>
                <input
                  id="max-rent"
                  type="number"
                  placeholder="50000"
                  value={maxRentInput}
                  onChange={(e) => setMaxRentInput(e.target.value)}
                  className="pl-10 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md py-2 px-4 border focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            <div className="w-full md:w-1/5 md:self-end">
              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md px-4 py-2 transition duration-300 ease-in-out flex items-center justify-center"
              >
                <FaSearch className="mr-2" />
                Search
              </button>
            </div>
          </form>
        </div>

        {/* Results section */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold text-gray-800">
              Available Apartments
              {(minRent || maxRent) && (
                <span className="text-sm font-normal text-gray-500 ml-2">
                  {minRent && maxRent ? `Price range: ${minRent} - ${maxRent} BDT` :
                    minRent ? `Min price: ${minRent} BDT` :
                      maxRent ? `Max price: ${maxRent} BDT` : ''}
                </span>
              )}
            </h2>
            <div className="text-gray-600">
              Showing {data.apartments.length} of {Math.min(6, data.apartments.length)} apartments
            </div>
          </div>

          {data.apartments.length === 0 ? (
            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <div className="text-gray-500 mb-4">
                <FaBuilding className="text-5xl mx-auto mb-4 text-gray-300" />
                <h3 className="text-xl font-medium text-gray-700 mb-2">No apartments found</h3>
                <p>Try adjusting your search criteria to find available apartments.</p>
              </div>
              <button
                onClick={() => {
                  setMinRentInput('');
                  setMaxRentInput('');
                  setMinRent('');
                  setMaxRent('');
                  refetch();
                }}
                className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md px-4 py-2 transition duration-300 ease-in-out"
              >
                Reset Search
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {data.apartments.map((apartment) => (
                <div key={apartment._id} className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:shadow-lg hover:-translate-y-1">
                  <div className="relative">
                    <img
                      src={apartment.image}
                      alt={`Apartment ${apartment.apartmentNo}`}
                      className="w-full h-56 object-cover"
                    />
                    <div className="absolute top-0 right-0 bg-blue-600 text-white px-3 py-1 m-2 rounded-md text-sm font-semibold">
                      {apartment.rent.toLocaleString()} BDT/month
                    </div>
                  </div>

                  <div className="p-5">
                    <h3 className="text-xl font-bold mb-3 text-gray-900">Apartment {apartment.apartmentNo}</h3>

                    <div className="space-y-2 mb-4">
                      <div className="flex items-center text-gray-700">
                        <FaBuilding className="mr-2 text-blue-600" />
                        <span>Floor: {apartment.floorNo}</span>
                      </div>
                      <div className="flex items-center text-gray-700">
                        <FaCity className="mr-2 text-blue-600" />
                        <span>Block: {apartment.blockName}</span>
                      </div>
                      <div className="flex items-center text-gray-700">
                        <FaMapMarkerAlt className="mr-2 text-blue-600" />
                        <span>Royal Palace, Banani, Dhaka</span>
                      </div>
                    </div>

                    <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-100">
                      <div className="text-sm text-gray-500">Available Now</div>
                      <button
                        onClick={() => handleAgreement(apartment)}
                        className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-2 rounded-md transition duration-300 ease-in-out"
                      >
                        Make Agreement
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Pagination Controls */}
        <div className="flex justify-center mt-12">
          <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
            <button
              onClick={() => {
                if (page > 1) {
                  setPage(page - 1);
                  refetch();
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }
              }}
              disabled={page === 1}
              className={`relative inline-flex items-center px-4 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium
                ${page === 1 ? 'text-gray-300 cursor-not-allowed' : 'text-gray-700 hover:bg-gray-50'}`}
            >
              <FaChevronLeft className="mr-1 h-3 w-3" />
              Previous
            </button>

            <span className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-blue-50 text-sm font-medium text-blue-700">
              Page {page} of {Math.max(1, data.totalPages)}
            </span>

            <button
              onClick={() => {
                if (page < data.totalPages) {
                  setPage(page + 1);
                  refetch();
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }
              }}
              disabled={data.apartments.length < 6 || page >= data.totalPages}
              className={`relative inline-flex items-center px-4 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium
                ${data.apartments.length < 6 || page >= data.totalPages ? 'text-gray-300 cursor-not-allowed' : 'text-gray-700 hover:bg-gray-50'}`}
            >
              Next
              <FaChevronRight className="ml-1 h-3 w-3" />
            </button>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Apartments;