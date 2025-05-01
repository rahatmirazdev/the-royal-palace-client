import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import LoadingSpinner from '../../components/Shared/LoadingSpinner';

const ResidentPortal = () => {
    const { user, loading } = useAuth();
    const [activeTab, setActiveTab] = useState('overview');

    if (loading) return <LoadingSpinner />;

    // If user is not logged in, show login prompt
    if (!user) {
        return (
            <div className="container mx-auto px-4 py-16 max-w-4xl">
                <div className="bg-white shadow-lg rounded-lg p-8 text-center">
                    <h1 className="text-3xl font-bold text-gray-800 mb-6">Resident Portal</h1>
                    <div className="border-b border-gray-200 mb-6"></div>

                    <div className="py-10">
                        <h2 className="text-xl font-semibold text-gray-700 mb-6">Please log in to access the Resident Portal</h2>
                        <p className="text-gray-600 mb-8">The Resident Portal provides access to your account information, payments, maintenance requests, and community resources.</p>

                        <div className="flex flex-col sm:flex-row justify-center gap-4">
                            <Link to="/login" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-md transition-all duration-300 font-medium text-lg shadow-md hover:shadow-lg">
                                Login
                            </Link>
                            <Link to="/signup" className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-8 py-3 rounded-md transition-all duration-300 font-medium text-lg shadow-md hover:shadow-lg">
                                Create Account
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // If user is logged in, show the portal dashboard
    return (
        <div className="container mx-auto px-4 py-8 max-w-6xl">
            <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                <div className="bg-blue-600 text-white p-6">
                    <h1 className="text-2xl font-bold">Resident Portal</h1>
                    <p className="text-blue-100">Welcome back, {user.displayName}</p>
                </div>

                {/* Tab Navigation */}
                <div className="flex overflow-x-auto bg-gray-100 border-b border-gray-200">
                    <button
                        className={`py-4 px-6 font-medium text-sm whitespace-nowrap ${activeTab === 'overview' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600 hover:text-blue-500'}`}
                        onClick={() => setActiveTab('overview')}
                    >
                        Overview
                    </button>
                    <button
                        className={`py-4 px-6 font-medium text-sm whitespace-nowrap ${activeTab === 'payments' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600 hover:text-blue-500'}`}
                        onClick={() => setActiveTab('payments')}
                    >
                        Payments
                    </button>
                    <button
                        className={`py-4 px-6 font-medium text-sm whitespace-nowrap ${activeTab === 'maintenance' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600 hover:text-blue-500'}`}
                        onClick={() => setActiveTab('maintenance')}
                    >
                        Maintenance Requests
                    </button>
                    <button
                        className={`py-4 px-6 font-medium text-sm whitespace-nowrap ${activeTab === 'documents' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600 hover:text-blue-500'}`}
                        onClick={() => setActiveTab('documents')}
                    >
                        Documents
                    </button>
                    <button
                        className={`py-4 px-6 font-medium text-sm whitespace-nowrap ${activeTab === 'community' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600 hover:text-blue-500'}`}
                        onClick={() => setActiveTab('community')}
                    >
                        Community
                    </button>
                </div>

                {/* Tab Content */}
                <div className="p-6">
                    {activeTab === 'overview' && (
                        <div className="space-y-6">
                            <h2 className="text-xl font-semibold text-gray-800">Account Overview</h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                                    <h3 className="text-lg font-medium text-gray-700 mb-3">Account Information</h3>
                                    <div className="space-y-2 text-gray-600">
                                        <p><span className="font-medium">Name:</span> {user.displayName}</p>
                                        <p><span className="font-medium">Email:</span> {user.email}</p>
                                        <p><span className="font-medium">Member Since:</span> {new Date().toLocaleDateString()}</p>
                                    </div>
                                </div>

                                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                                    <h3 className="text-lg font-medium text-gray-700 mb-3">Quick Links</h3>
                                    <div className="space-y-2">
                                        <Link to="/dashboard" className="text-blue-600 hover:text-blue-800 block">Go to Dashboard</Link>
                                        <Link to="/dashboard/announcements" className="text-blue-600 hover:text-blue-800 block">View Announcements</Link>
                                        <Link to="/dashboard/payment-history" className="text-blue-600 hover:text-blue-800 block">Payment History</Link>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-blue-800">
                                <h3 className="font-medium mb-2">Next Payment Due:</h3>
                                <p>Your next payment of BDT 25,000 is due on {new Date(new Date().setDate(new Date().getDate() + 15)).toLocaleDateString()}.</p>
                            </div>
                        </div>
                    )}

                    {activeTab === 'payments' && (
                        <div className="space-y-6">
                            <h2 className="text-xl font-semibold text-gray-800">Payments</h2>
                            <p className="text-gray-600">Manage your payments and view your payment history.</p>

                            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                                <h3 className="text-lg font-medium text-gray-700 mb-3">Payment Options</h3>
                                <Link
                                    to="/dashboard/make-payment"
                                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md inline-block transition-colors"
                                >
                                    Make a Payment
                                </Link>
                            </div>

                            <div>
                                <h3 className="text-lg font-medium text-gray-700 mb-3">Recent Payments</h3>
                                <div className="overflow-x-auto">
                                    <table className="min-w-full bg-white border border-gray-200">
                                        <thead>
                                            <tr className="bg-gray-100">
                                                <th className="py-2 px-4 border-b text-left">Date</th>
                                                <th className="py-2 px-4 border-b text-left">Description</th>
                                                <th className="py-2 px-4 border-b text-left">Amount</th>
                                                <th className="py-2 px-4 border-b text-left">Status</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr className="hover:bg-gray-50">
                                                <td className="py-2 px-4 border-b">{new Date(new Date().setDate(new Date().getDate() - 30)).toLocaleDateString()}</td>
                                                <td className="py-2 px-4 border-b">Monthly Rent</td>
                                                <td className="py-2 px-4 border-b">BDT 25,000</td>
                                                <td className="py-2 px-4 border-b text-green-600">Paid</td>
                                            </tr>
                                            <tr className="hover:bg-gray-50">
                                                <td className="py-2 px-4 border-b">{new Date(new Date().setDate(new Date().getDate() - 60)).toLocaleDateString()}</td>
                                                <td className="py-2 px-4 border-b">Monthly Rent</td>
                                                <td className="py-2 px-4 border-b">BDT 25,000</td>
                                                <td className="py-2 px-4 border-b text-green-600">Paid</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'maintenance' && (
                        <div className="space-y-6">
                            <h2 className="text-xl font-semibold text-gray-800">Maintenance Requests</h2>
                            <p className="text-gray-600">Submit and track maintenance requests for your apartment.</p>

                            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                                <h3 className="text-lg font-medium text-gray-700 mb-3">New Request</h3>
                                <form className="space-y-4">
                                    <div>
                                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="issue">
                                            Issue Type
                                        </label>
                                        <select
                                            id="issue"
                                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        >
                                            <option>Plumbing</option>
                                            <option>Electrical</option>
                                            <option>HVAC</option>
                                            <option>Appliance</option>
                                            <option>Other</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
                                            Description
                                        </label>
                                        <textarea
                                            id="description"
                                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                            rows="4"
                                            placeholder="Please describe the issue in detail..."
                                        ></textarea>
                                    </div>
                                    <button
                                        type="submit"
                                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors"
                                    >
                                        Submit Request
                                    </button>
                                </form>
                            </div>

                            <div>
                                <h3 className="text-lg font-medium text-gray-700 mb-3">Request History</h3>
                                <p className="text-gray-600 italic">No maintenance requests found.</p>
                            </div>
                        </div>
                    )}

                    {activeTab === 'documents' && (
                        <div className="space-y-6">
                            <h2 className="text-xl font-semibold text-gray-800">Documents</h2>
                            <p className="text-gray-600">Access important documents related to your residency.</p>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                                    <h3 className="font-medium text-gray-800 mb-2">Lease Agreement</h3>
                                    <p className="text-gray-600 text-sm mb-3">Your current lease agreement and terms.</p>
                                    <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">Download PDF</button>
                                </div>

                                <div className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                                    <h3 className="font-medium text-gray-800 mb-2">Building Rules &amp; Regulations</h3>
                                    <p className="text-gray-600 text-sm mb-3">Guidelines for all residents.</p>
                                    <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">Download PDF</button>
                                </div>

                                <div className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                                    <h3 className="font-medium text-gray-800 mb-2">Move-In Checklist</h3>
                                    <p className="text-gray-600 text-sm mb-3">Items to review when moving in.</p>
                                    <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">Download PDF</button>
                                </div>

                                <div className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                                    <h3 className="font-medium text-gray-800 mb-2">Maintenance Procedures</h3>
                                    <p className="text-gray-600 text-sm mb-3">How to submit and track maintenance requests.</p>
                                    <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">Download PDF</button>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'community' && (
                        <div className="space-y-6">
                            <h2 className="text-xl font-semibold text-gray-800">Community</h2>
                            <p className="text-gray-600">Connect with your community and stay informed about events.</p>

                            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                                <h3 className="text-lg font-medium text-gray-700 mb-3">Upcoming Events</h3>
                                <div className="space-y-4">
                                    <div className="border-b border-gray-200 pb-4">
                                        <h4 className="font-medium text-gray-800">Residents Meet &amp; Greet</h4>
                                        <p className="text-gray-600 mb-1">May 15, 2025 • 6:00 PM - 8:00 PM</p>
                                        <p className="text-gray-600 mb-2">Location: Rooftop Garden</p>
                                        <p className="text-gray-600">Join us for refreshments and meet your neighbors!</p>
                                    </div>

                                    <div className="border-b border-gray-200 pb-4">
                                        <h4 className="font-medium text-gray-800">Building Maintenance Update</h4>
                                        <p className="text-gray-600 mb-1">May 22, 2025 • 7:00 PM - 8:00 PM</p>
                                        <p className="text-gray-600 mb-2">Location: Conference Room</p>
                                        <p className="text-gray-600">Management will provide updates on planned improvements.</p>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                                <h3 className="text-lg font-medium text-gray-700 mb-3">Amenity Reservations</h3>
                                <p className="text-gray-600 mb-3">Reserve common areas for private events.</p>
                                <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors">
                                    Make a Reservation
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ResidentPortal;