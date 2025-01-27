import { FaBars, FaHistory, FaHome, FaRegUserCircle } from 'react-icons/fa'
import { SlEnvolopeLetter } from "react-icons/sl";
import { CiMoneyCheck1 } from "react-icons/ci";
import { HiOutlineUsers } from "react-icons/hi";
import { IoMdNotificationsOutline } from "react-icons/io";
import { RiCoupon2Line } from "react-icons/ri";
import { Link, Navigate, Outlet } from 'react-router-dom'
import useAuth from '../hooks/useAuth';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import LoadingSpinner from '../components/Shared/LoadingSpinner';
import axiosInstance from './../hooks/axiosInstance';

const DashboardLayout = () => {
  const { user, loading } = useAuth();
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

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

  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col">
        <label htmlFor="my-drawer-2" className="drawer-button lg:hidden border w-full px-4 py-2">
          <FaBars />
        </label>
        <div>
          <Outlet />
        </div>
      </div>
      <div className="drawer-side">
        <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
        <ul className="menu bg-base-200 text-base-content min-h-full p-4">
          {/* Sidebar content here */}
          <li><Link to="/" className='py-2 px-8'><FaHome /> Home</Link></li>
          <div className="divider"></div>
          {/* user routes */}
          {
            userData.role === 'user' && (
              <>
                <li><Link to="/dashboard/my-profile" className='py-2 px-8'><FaRegUserCircle /> My Profile</Link></li>
                <li><Link to="/dashboard/announcements" className='py-2 px-8'><SlEnvolopeLetter /> Announcements</Link></li>
              </>
            )
          }

          {/* member routes */}
          {
            userData.role === 'member' && (
              <>
                <li><Link to="/dashboard/my-profile" className='py-2 px-8'><FaRegUserCircle /> My Profile</Link></li>
                <li><Link to="/dashboard/make-payment" className='py-2 px-8'><CiMoneyCheck1 /> Make Payment</Link></li>
                <li><Link className='py-2 px-8'><FaHistory /> PaymentHistory</Link></li>
                <li><Link to="/dashboard/announcements" className='py-2 px-8'><SlEnvolopeLetter /> Announcements</Link></li>
              </>
            )
          }

          {/* admin routes */}
          {
            userData.role === 'admin' && (
              <>
                <li><Link to="/dashboard/my-profile" className='py-2 px-8'><FaRegUserCircle /> Admin Profile</Link></li>
                <li><Link to="/dashboard/manage-members" className='py-2 px-8'><HiOutlineUsers /> Manage Members</Link></li>
                <li><Link to="/dashboard/make-announcement" className='py-2 px-8'><SlEnvolopeLetter />Make Announcements</Link></li>
                <li><Link to="/dashboard/agreement-requests" className='py-2 px-8'><IoMdNotificationsOutline />Agreement Requests</Link></li>
                <li><Link to="/dashboard/manage-coupons" className='py-2 px-8'><RiCoupon2Line /> Manage Coupons</Link></li>
              </>
            )
          }
        </ul>
      </div>
    </div>
  )
}

export default DashboardLayout