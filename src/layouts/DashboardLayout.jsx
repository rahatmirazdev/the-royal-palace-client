import { FaBars, FaHistory, FaHome, FaRegUserCircle, FaSignOutAlt, FaBuilding } from 'react-icons/fa'
import { SlEnvolopeLetter } from "react-icons/sl";
import { CiMoneyCheck1 } from "react-icons/ci";
import { HiOutlineUsers } from "react-icons/hi";
import { IoMdNotificationsOutline } from "react-icons/io";
import { RiCoupon2Line } from "react-icons/ri";
import { Link, Outlet, useLocation } from 'react-router-dom'
import useAuth from '../hooks/useAuth';
import { useEffect, useState, useRef } from 'react';
import { toast } from 'react-hot-toast';
import LoadingSpinner from '../components/Shared/LoadingSpinner';
import axiosInstance from './../hooks/axiosInstance';

const DashboardLayout = () => {
  const { user, loading, logOut } = useAuth();
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const userMenuRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setUserMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axiosInstance.get(`/users/${user.email}`);
        setUserData(response.data);
      } catch (error) {
        toast('Error fetching user:', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (!loading) {
      fetchUser();
    }
  }, [loading, user]);

  if (loading || isLoading) {
    return <LoadingSpinner />;
  }

  const handleLogout = async () => {
    try {
      await logOut();
      toast.success('Logged out successfully');
    } catch (error) {
      toast.error('Failed to log out');
    }
  };

  // Check if a menu item is active
  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <div className="drawer lg:drawer-open min-h-screen">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col">
        {/* Mobile header */}
        <div className="lg:hidden bg-white shadow-md p-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <FaBuilding className="text-blue-600 h-6 w-6" />
            <span className="font-bold text-lg">Royal Palace</span>
          </div>
          <label htmlFor="my-drawer-2" className="drawer-button p-2 rounded-md hover:bg-gray-100">
            <FaBars className="text-gray-700" />
          </label>
        </div>

        {/* Desktop Top Navbar */}
        <div className="hidden lg:flex bg-white shadow-sm p-4 justify-between items-center border-b border-gray-100">
          <div className="flex items-center">
            <h2 className="text-lg font-semibold text-gray-700">{location.pathname === '/dashboard' ? 'Dashboard' :
              location.pathname.includes('my-profile') ? 'My Profile' :
                location.pathname.includes('announcements') ? 'Announcements' :
                  location.pathname.includes('make-payment') ? 'Make Payment' :
                    location.pathname.includes('payment-history') ? 'Payment History' :
                      location.pathname.includes('manage-members') ? 'Manage Members' :
                        location.pathname.includes('make-announcement') ? 'Make Announcement' :
                          location.pathname.includes('agreement-requests') ? 'Agreement Requests' :
                            location.pathname.includes('manage-coupons') ? 'Manage Coupons' : 'Dashboard'
            }</h2>
          </div>

          <div className="flex items-center space-x-4">
            {/* User Menu */}
            <div className="relative" ref={userMenuRef}>
              <button
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="flex items-center space-x-2 focus:outline-none"
                aria-expanded={userMenuOpen}
                aria-haspopup="true"
              >
                <div className="h-9 w-9 overflow-hidden rounded-full border-2 border-gray-200 hover:border-blue-300 transition-all duration-200">
                  {user.photoURL ? (
                    <img
                      className="h-full w-full object-cover"
                      src={user.photoURL}
                      alt={user.displayName || "User"}
                    />
                  ) : (
                    <div className="bg-blue-500 h-full w-full flex items-center justify-center text-xl text-white">
                      {user.displayName ? user.displayName[0].toUpperCase() : 'U'}
                    </div>
                  )}
                </div>
                <div className="hidden xl:block text-left">
                  <p className="text-sm font-medium text-gray-700">{user.displayName || "User"}</p>
                  <p className="text-xs text-gray-500">{userData.role.charAt(0).toUpperCase() + userData.role.slice(1)}</p>
                </div>
              </button>

              {/* User Menu Dropdown */}
              {userMenuOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg py-2 z-10 border border-gray-200">
                  <div className="border-b border-gray-100 pb-2 pt-1 px-4">
                    <p className="text-sm font-medium text-gray-900">{user.displayName || "User"}</p>
                    <p className="text-xs text-gray-500 truncate">{user.email}</p>
                  </div>
                  <Link
                    to="/dashboard/my-profile"
                    className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-blue-600"
                    onClick={() => setUserMenuOpen(false)}
                  >
                    <FaRegUserCircle className="mr-3 h-4 w-4" />
                    <span>My Profile</span>
                  </Link>
                  <button
                    onClick={() => {
                      handleLogout();
                      setUserMenuOpen(false);
                    }}
                    className="flex items-center w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                  >
                    <FaSignOutAlt className="mr-3 h-4 w-4" />
                    <span>Sign out</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="p-4 md:p-6 bg-gray-50 min-h-[calc(100vh-4rem)] lg:min-h-[calc(100vh-4.5rem)]">
          <Outlet />
        </div>
      </div>

      <div className="drawer-side shadow-xl">
        <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
        <div className="menu bg-white text-base-content min-h-full w-80 p-0">
          {/* User profile card */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6">
            <div className="flex flex-col items-center mb-4">
              <div className="avatar mb-3">
                <div className="w-20 h-20 rounded-full ring ring-white ring-opacity-50">
                  {user.photoURL ? (
                    <img src={user.photoURL} alt={user.displayName || "User"} />
                  ) : (
                    <div className="bg-blue-400 h-full w-full flex items-center justify-center text-3xl">
                      {user.displayName ? user.displayName[0].toUpperCase() : 'U'}
                    </div>
                  )}
                </div>
              </div>
              <h2 className="text-xl font-semibold mb-1">{user.displayName || "User"}</h2>
              <p className="text-sm text-blue-100 opacity-90">{userData.role.charAt(0).toUpperCase() + userData.role.slice(1)}</p>
            </div>
          </div>

          {/* Navigation links */}
          <ul className="p-4 space-y-1">
            <li>
              <Link to="/" className={`flex items-center py-3 px-4 rounded-lg ${isActive('/') ? 'bg-blue-50 text-blue-600 font-medium' : 'text-gray-700 hover:bg-gray-100'}`}>
                <FaHome className="mr-3" /> Home
              </Link>
            </li>

            <li className="mt-6">
              <p className="text-xs font-semibold text-gray-500 uppercase px-4 mb-2">Menu</p>
            </li>

            {/* user routes */}
            {userData.role === 'user' && (
              <>
                <li>
                  <Link to="/dashboard/my-profile" className={`flex items-center py-3 px-4 rounded-lg ${isActive('/dashboard/my-profile') ? 'bg-blue-50 text-blue-600 font-medium' : 'text-gray-700 hover:bg-gray-100'}`}>
                    <FaRegUserCircle className="mr-3" /> My Profile
                  </Link>
                </li>
                <li>
                  <Link to="/dashboard/announcements" className={`flex items-center py-3 px-4 rounded-lg ${isActive('/dashboard/announcements') ? 'bg-blue-50 text-blue-600 font-medium' : 'text-gray-700 hover:bg-gray-100'}`}>
                    <SlEnvolopeLetter className="mr-3" /> Announcements
                  </Link>
                </li>
              </>
            )}

            {/* member routes */}
            {userData.role === 'member' && (
              <>
                <li>
                  <Link to="/dashboard/my-profile" className={`flex items-center py-3 px-4 rounded-lg ${isActive('/dashboard/my-profile') ? 'bg-blue-50 text-blue-600 font-medium' : 'text-gray-700 hover:bg-gray-100'}`}>
                    <FaRegUserCircle className="mr-3" /> My Profile
                  </Link>
                </li>
                <li>
                  <Link to="/dashboard/make-payment" className={`flex items-center py-3 px-4 rounded-lg ${isActive('/dashboard/make-payment') ? 'bg-blue-50 text-blue-600 font-medium' : 'text-gray-700 hover:bg-gray-100'}`}>
                    <CiMoneyCheck1 className="mr-3" /> Make Payment
                  </Link>
                </li>
                <li>
                  <Link to="/dashboard/payment-history" className={`flex items-center py-3 px-4 rounded-lg ${isActive('/dashboard/payment-history') ? 'bg-blue-50 text-blue-600 font-medium' : 'text-gray-700 hover:bg-gray-100'}`}>
                    <FaHistory className="mr-3" /> Payment History
                  </Link>
                </li>
                <li>
                  <Link to="/dashboard/announcements" className={`flex items-center py-3 px-4 rounded-lg ${isActive('/dashboard/announcements') ? 'bg-blue-50 text-blue-600 font-medium' : 'text-gray-700 hover:bg-gray-100'}`}>
                    <SlEnvolopeLetter className="mr-3" /> Announcements
                  </Link>
                </li>
              </>
            )}

            {/* admin routes */}
            {userData.role === 'admin' && (
              <>
                <li>
                  <Link to="/dashboard/my-profile" className={`flex items-center py-3 px-4 rounded-lg ${isActive('/dashboard/my-profile') ? 'bg-blue-50 text-blue-600 font-medium' : 'text-gray-700 hover:bg-gray-100'}`}>
                    <FaRegUserCircle className="mr-3" /> Admin Profile
                  </Link>
                </li>
                <li>
                  <Link to="/dashboard/manage-members" className={`flex items-center py-3 px-4 rounded-lg ${isActive('/dashboard/manage-members') ? 'bg-blue-50 text-blue-600 font-medium' : 'text-gray-700 hover:bg-gray-100'}`}>
                    <HiOutlineUsers className="mr-3" /> Manage Members
                  </Link>
                </li>
                <li>
                  <Link to="/dashboard/make-announcement" className={`flex items-center py-3 px-4 rounded-lg ${isActive('/dashboard/make-announcement') ? 'bg-blue-50 text-blue-600 font-medium' : 'text-gray-700 hover:bg-gray-100'}`}>
                    <SlEnvolopeLetter className="mr-3" /> Make Announcements
                  </Link>
                </li>
                <li>
                  <Link to="/dashboard/agreement-requests" className={`flex items-center py-3 px-4 rounded-lg ${isActive('/dashboard/agreement-requests') ? 'bg-blue-50 text-blue-600 font-medium' : 'text-gray-700 hover:bg-gray-100'}`}>
                    <IoMdNotificationsOutline className="mr-3" /> Agreement Requests
                  </Link>
                </li>
                <li>
                  <Link to="/dashboard/manage-coupons" className={`flex items-center py-3 px-4 rounded-lg ${isActive('/dashboard/manage-coupons') ? 'bg-blue-50 text-blue-600 font-medium' : 'text-gray-700 hover:bg-gray-100'}`}>
                    <RiCoupon2Line className="mr-3" /> Manage Coupons
                  </Link>
                </li>
              </>
            )}

            {/* Logout Button */}
            <li className="mt-6">
              <button
                onClick={handleLogout}
                className="flex items-center py-3 px-4 rounded-lg w-full text-left text-red-600 hover:bg-red-50"
              >
                <FaSignOutAlt className="mr-3" /> Logout
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default DashboardLayout