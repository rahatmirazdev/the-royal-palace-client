import { Link } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth.js';
import { useState } from 'react';

const Navbar = () => {
  const { user, logOut } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = async () => {
    await logOut();
  };

  return (
    <nav className="bg-white fixed w-full z-50 top-0 left-0">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-4">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <span className="font-bold text-black text-xl text-center">The Royal <br /> Palace</span>
            </Link>
          </div>
          <div className="flex-grow flex justify-center">
            <div className="hidden md:flex items-baseline space-x-4">
              <Link to="/" className="text-gray-800 hover:text-gray-600 px-3 py-2 rounded-md text-sm font-medium">Home</Link>
              <Link to="/apartments" className="text-gray-800 hover:text-gray-600 px-3 py-2 rounded-md text-sm font-medium">Apartments</Link>
            </div>
          </div>
          <div className="flex items-center">
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex text-sm border-2 border-transparent rounded-full focus:outline-none focus:border-gray-300"
                >
                  <img className="h-8 w-8 rounded-full" src={user.photoURL} alt="User profile" />
                </button>
                {dropdownOpen && (
                  <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5">
                    <div className="block px-4 py-2 text-sm text-gray-700">{user.displayName}</div>
                    <Link to="/dashboard" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Dashboard</Link>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link to="/login" className="text-gray-800 hover:text-gray-600 px-3 py-2 rounded-md text-sm font-medium">Login</Link>
            )}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden ml-3 text-gray-800 hover:text-gray-600 focus:outline-none"
            >
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
      {menuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link to="/" className="text-gray-800 hover:text-gray-600 block px-3 py-2 rounded-md text-base font-medium">Home</Link>
            <Link to="/apartments" className="text-gray-800 hover:text-gray-600 block px-3 py-2 rounded-md text-base font-medium">Apartment</Link>
            {user ? (
              <>
                <Link to="/dashboard" className="text-gray-800 hover:text-gray-600 block px-3 py-2 rounded-md text-base font-medium">Dashboard</Link>
                <button
                  onClick={handleLogout}
                  className="text-gray-800 hover:text-gray-600 block w-full text-left px-3 py-2 rounded-md text-base font-medium"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link to="/login" className="text-gray-800 hover:text-gray-600 block px-3 py-2 rounded-md text-base font-medium">Login</Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;