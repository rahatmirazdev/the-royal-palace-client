import { Outlet, Link } from 'react-router-dom';
import { FaHome, FaUser } from "react-icons/fa";
import { MdAnnouncement } from "react-icons/md";
import Footer from './../../components/Shared/Footer/Footer';

const DashboardLayout = () => {
  return (
    <div className='bg-white'>
      <div className='flex '>
        <aside className='w-64 bg-gray-100 min-h-[calc(100vh-68px)] pt-9 pl-2'>
          <Link to="/" className="flex items-center">
            <span className="font-bold text-black text-2xl text-center py-3 md:py-10">The Royal Palace</span>
          </Link>
          <nav className='space-y-4'>
            <Link to='/' className='text-gray-700 hover:text-blue-500 flex items-center gap-2'>
              <FaHome />
              Back to home
            </Link>
            <Link to='/dashboard/profile' className=' text-gray-700 hover:text-blue-500 flex items-center gap-2'>
              <FaUser />
              My Profile
            </Link>
            <Link to='/dashboard/announcements' className=' text-gray-700 hover:text-blue-500 flex items-center gap-2'>
              <MdAnnouncement />
              Announcements
            </Link>
          </nav>
        </aside>
        <main className='flex-1 p-4'>
          <Outlet />
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default DashboardLayout;