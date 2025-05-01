import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaYoutube, FaBuilding, FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8">
      {/* Top Section with Logo and Links */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* About Column */}
          <div>
            <div className="flex items-center mb-6">
              <FaBuilding className="text-blue-500 h-8 w-8 mr-3" />
              <div className="font-bold text-xl">
                <span className="block leading-tight">The Royal</span>
                <span className="block leading-tight text-blue-500">Palace</span>
              </div>
            </div>
            <p className="text-gray-400 mb-4">
              Experience luxury living at its finest in our premium building with state-of-the-art amenities and services tailored to meet your needs.
            </p>
            <div className="flex space-x-4 mt-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-500 transition-colors">
                <FaFacebook className="w-6 h-6" />
                <span className="sr-only">Facebook</span>
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-500 transition-colors">
                <FaTwitter className="w-6 h-6" />
                <span className="sr-only">Twitter</span>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-500 transition-colors">
                <FaInstagram className="w-6 h-6" />
                <span className="sr-only">Instagram</span>
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-500 transition-colors">
                <FaLinkedin className="w-6 h-6" />
                <span className="sr-only">LinkedIn</span>
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-500 transition-colors">
                <FaYoutube className="w-6 h-6" />
                <span className="sr-only">YouTube</span>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6 border-b border-gray-700 pb-2">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-gray-400 hover:text-blue-500 transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/apartments" className="text-gray-400 hover:text-blue-500 transition-colors">Apartments</Link>
              </li>
              <li>
                <Link to="/faqs" className="text-gray-400 hover:text-blue-500 transition-colors">FAQs</Link>
              </li>
              <li>
                <Link to="/privacy-policy" className="text-gray-400 hover:text-blue-500 transition-colors">Privacy Policy</Link>
              </li>
              <li>
                <Link to="/terms-of-service" className="text-gray-400 hover:text-blue-500 transition-colors">Terms of Service</Link>
              </li>
            </ul>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="text-lg font-semibold mb-6 border-b border-gray-700 pb-2">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <FaMapMarkerAlt className="text-blue-500 mt-1 mr-3 flex-shrink-0" />
                <span className="text-gray-400">Building 12, Road 5, Block A, Banani<br />Dhaka 1213, Bangladesh</span>
              </li>
              <li className="flex items-center">
                <FaPhone className="text-blue-500 mr-3 flex-shrink-0" />
                <span className="text-gray-400">+880 1711-123456</span>
              </li>
              <li className="flex items-center">
                <FaEnvelope className="text-blue-500 mr-3 flex-shrink-0" />
                <a href="mailto:info@royalpalace.com" className="text-gray-400 hover:text-blue-500 transition-colors">info@royalpalace.com</a>
              </li>
            </ul>
          </div>

          {/* Newsletter Signup */}
          <div>
            <h3 className="text-lg font-semibold mb-6 border-b border-gray-700 pb-2">Stay Updated</h3>
            <p className="text-gray-400 mb-4">Subscribe to our newsletter for updates on new apartments, promotions, and community events.</p>
            <form className="flex flex-col space-y-2">
              <input
                type="email"
                placeholder="Your email address"
                className="bg-gray-800 border border-gray-700 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-300"
              />
              <button type="submit" className="bg-blue-600 hover:bg-blue-700 transition-colors px-4 py-2 rounded-md font-medium">
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Middle Section with Additional Links */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 border-t border-gray-800 pt-8 pb-8">
        <div className="flex flex-wrap justify-center gap-4 md:gap-8 text-sm">
          <Link to="/privacy-policy" className="text-gray-400 hover:text-blue-500 transition-colors">Privacy Policy</Link>
          <Link to="/terms-of-service" className="text-gray-400 hover:text-blue-500 transition-colors">Terms of Service</Link>
          <Link to="/faqs" className="text-gray-400 hover:text-blue-500 transition-colors">FAQs</Link>
        </div>
      </div>

      {/* Copyright Section */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 border-t border-gray-800 pt-8"></div>
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between">
        <p className="text-sm text-gray-500 mb-4 md:mb-0">
          © {currentYear} The Royal Palace Inc. All rights reserved.
        </p>
        <p className="text-sm text-gray-500">
          Designed with ❤️ by Royal Palace Development Team
        </p>
      </div>
    </footer>
  );
};

export default Footer;