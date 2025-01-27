import React, { useState } from 'react';
import useFetchData from '../../hooks/useFetchData';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import axiosInstance from '../../hooks/axiosInstance';
import LoadingSpinner from '../../components/Shared/LoadingSpinner';
import { ToastContainer, toast } from 'react-toastify';

const Apartments = () => {
  const [page, setPage] = useState(1);
  const [minRentInput, setMinRentInput] = useState('');
  const [maxRentInput, setMaxRentInput] = useState('');
  const [minRent, setMinRent] = useState('');
  const [maxRent, setMaxRent] = useState('');
  const { user } = useAuth();
  const navigate = useNavigate();

  const { data, isLoading, isError, error, refetch } = useFetchData('apartments', `/apartments?page=${page}&minRent=${minRent}&maxRent=${maxRent}`);

  const handleAgreement = async (apartment) => {
    if (!user) {
      navigate('/login');
      return;
    }
    try {
      const response = await axiosInstance.post('/apartments/agreement', {
        userName: user.name,
        userEmail: user.email,
        floorNo: apartment.floorNo,
        blockName: apartment.blockName,
        apartmentNo: apartment.apartmentNo,
        rent: apartment.rent,
        status: 'pending',
        requestDate: new Date().toISOString(),
      });
      toast.success('Agreement created successfully.');
    } catch (error) {
      toast.error(error.response?.data?.message);
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
  if (isError) return <div>Error: {error.message}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <ToastContainer />
      <h1 className="text-4xl font-bold text-center mb-8 text-black">Available Apartments</h1>
      <form onSubmit={handleSearch} className="flex justify-center mb-8">
        <input
          type="number"
          placeholder="Min Rent"
          value={minRentInput}
          onChange={(e) => setMinRentInput(e.target.value)}
          className="border px-4 py-2 mr-2 bg-transparent text-black"
        />
        <input
          type="number"
          placeholder="Max Rent"
          value={maxRentInput}
          onChange={(e) => setMaxRentInput(e.target.value)}
          className="border px-4 py-2 bg-transparent text-black"
        />
        <button type="submit" className="bg-blue-500 text-white rounded-md px-4 py-2 ml-2">
          Search
        </button>
      </form>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {data.apartments.map((apartment) => (
          <div key={apartment._id} className="bg-white p-6 rounded-lg shadow-lg">
            <img src={apartment.image} alt="Apartment" className="w-full h-48 object-cover mb-4 rounded-lg" />
            <h3 className="text-xl font-bold mb-2 text-black">Apartment No: {apartment.apartmentNo}</h3>
            <p className="text-gray-700 mb-2">Floor No: {apartment.floorNo}</p>
            <p className="text-gray-700 mb-2">Block Name: {apartment.blockName}</p>
            <p className="text-gray-700 mb-2">Rent: {apartment.rent} TK</p>
            <button
              onClick={() => handleAgreement(apartment)}
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-200"
            >
              Make Agreement
            </button>
          </div>
        ))}
      </div>
      <div className="flex justify-center mt-8">
        <button
          onClick={() => {
            setPage(page - 1);
            refetch();
          }}
          disabled={page === 1}
          className="px-4 py-2 mx-1 bg-gray-300 rounded-md hover:bg-gray-400 disabled:opacity-50"
        >
          Previous
        </button>
        <button
          onClick={() => {
            setPage(page + 1);
            refetch();
          }}
          disabled={data.apartments.length < 6}
          className="px-4 py-2 mx-1 bg-gray-300 rounded-md hover:bg-gray-400 disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Apartments;