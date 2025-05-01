import { Link } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth.js';
import { useState, useEffect } from 'react';
import { FaBuilding, FaUserCircle, FaSignOutAlt, FaTachometerAlt, FaQuestionCircle } from 'react-icons/fa';

const Navbar = () => {
  const { user, logOut } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [resourcesDropdownOpen, setResourcesDropdownOpen] = useState(false);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownOpen && !event.target.closest('.profile-dropdown')) {
        setDropdownOpen(false);
      }
      if (resourcesDropdownOpen && !event.target.closest('.resources-dropdown')) {
        setResourcesDropdownOpen(false);
      }
    };

    // Add transparency effect on scroll
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    window.addEventListener('scroll', handleScroll);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [dropdownOpen, resourcesDropdownOpen]);

  const handleLogout = async () => {
    await logOut();
    setDropdownOpen(false);
  };

  return (
    <nav className={`fixed w-full z-50 top-0 left-0 transition-all duration-300 ${scrolled ? 'bg-white shadow-md py-2' : 'bg-white/95 py-4'
      }`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <FaBuilding className="text-blue-600 h-8 w-8" />
              <div className="font-bold text-gray-800 text-xl">
                <span className="block leading-tight">The Royal</span>
                <span className="block leading-tight text-blue-600">Palace</span>
              </div>
            </Link>
          </div>

          <div className="hidden md:flex items-center justify-center space-x-1 flex-grow">
            <Link
              to="/"
              className="px-4 py-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-colors duration-200 font-medium"
            >
              Home
            </Link>
            <Link
              to="/apartments"
              className="px-4 py-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-colors duration-200 font-medium"
            >
              Apartments
            </Link>
            <div className="relative resources-dropdown">
              <button
                onClick={() => setResourcesDropdownOpen(!resourcesDropdownOpen)}
                className="px-4 py-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-colors duration-200 font-medium flex items-center gap-1"
              >
                Resources
                <svg className={`w-4 h-4 transition-transform ${resourcesDropdownOpen ? 'rotate-180' : 'rotate-0'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {resourcesDropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 py-1 z-50 transform opacity-100 scale-100 transition-all duration-200 ease-out origin-top-right">
                  <Link
                    to="/faqs"
                    className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                    onClick={() => setResourcesDropdownOpen(false)}
                  >
                    <FaQuestionCircle className="mr-3 h-4 w-4" />
                    <span>FAQs</span>
                  </Link>
                  <div className="border-t border-gray-100 my-1"></div>
                  <Link
                    to="/privacy-policy"
                    className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                    onClick={() => setResourcesDropdownOpen(false)}
                  >
                    <span className="ml-7">Privacy Policy</span>
                  </Link>
                  <Link
                    to="/terms-of-service"
                    className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                    onClick={() => setResourcesDropdownOpen(false)}
                  >
                    <span className="ml-7">Terms of Service</span>
                  </Link>
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center space-x-3">
            {user ? (
              <div className="relative profile-dropdown">
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center space-x-2 focus:outline-none"
                  aria-expanded={dropdownOpen}
                  aria-haspopup="true"
                >
                  <div className="h-10 w-10 overflow-hidden rounded-full border-2 border-blue-100 hover:border-blue-300 transition-all duration-200 shadow">
                    {user.photoURL ? (
                      <img
                        className="h-full w-full object-cover"
                        src={user.photoURL}
                        alt={user.displayName || "User"}
                      />
                    ) : (
                      <FaUserCircle className="h-full w-full text-gray-400" />
                    )}
                  </div>
                </button>

                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 py-1 z-50 transform opacity-100 scale-100 transition-all duration-200 ease-out origin-top-right">
                    <div className="border-b border-gray-100 py-3 px-4">
                      <p className="text-sm font-medium text-gray-900">{user.displayName || "User"}</p>
                      <p className="text-xs text-gray-500 truncate">{user.email}</p>
                    </div>

                    <Link
                      to="/dashboard"
                      className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                      onClick={() => setDropdownOpen(false)}
                    >
                      <FaTachometerAlt className="mr-3 h-4 w-4" />
                      <span>Dashboard</span>
                    </Link>

                    <button
                      onClick={handleLogout}
                      className="flex items-center w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                    >
                      <FaSignOutAlt className="mr-3 h-4 w-4" />
                      <span>Sign out</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/login"
                className="inline-flex items-center justify-center px-5 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 shadow-sm transition-colors duration-200"
              >
                Login
              </Link>
            )}

            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden text-gray-500 hover:text-blue-600 focus:outline-none"
              aria-expanded={menuOpen}
            >
              <span className="sr-only">Open main menu</span>
              {menuOpen ? (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-white shadow-lg border-t border-gray-100 animate-fadeIn">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link
              to="/"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50"
              onClick={() => setMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/apartments"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50"
              onClick={() => setMenuOpen(false)}
            >
              Apartments
            </Link>

            <div className="border-t border-gray-100 my-1 pt-1">
              <p className="px-3 text-xs font-medium text-gray-500 uppercase">Resources</p>
            </div>

            <Link
              to="/faqs"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50"
              onClick={() => setMenuOpen(false)}
            >
              FAQs
            </Link>
            <Link
              to="/privacy-policy"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50"
              onClick={() => setMenuOpen(false)}
            >
              Privacy Policy
            </Link>
            <Link
              to="/terms-of-service"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50"
              onClick={() => setMenuOpen(false)}
            >
              Terms of Service
            </Link>

            {user ? (
              <>
                <Link
                  to="/dashboard"
                  className="flex items-center px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50"
                  onClick={() => setMenuOpen(false)}
                >
                  <FaTachometerAlt className="mr-3 h-4 w-4" />
                  Dashboard
                </Link>
                <button
                  onClick={() => {
                    handleLogout();
                    setMenuOpen(false);
                  }}
                  className="flex items-center w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50"
                >
                  <FaSignOutAlt className="mr-3 h-4 w-4" />
                  Sign out
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50"
                onClick={() => setMenuOpen(false)}
              >
                Login
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;