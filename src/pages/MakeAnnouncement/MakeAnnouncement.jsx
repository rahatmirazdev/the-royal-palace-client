import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import axiosInstance from './../../hooks/axiosInstance';
import { FaBullhorn, FaCheck, FaTimes } from 'react-icons/fa';
import { MdTitle, MdDescription } from 'react-icons/md';

const MakeAnnouncement = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [titleError, setTitleError] = useState('');
  const [descriptionError, setDescriptionError] = useState('');
  const [showPreview, setShowPreview] = useState(false);

  const validateForm = () => {
    let isValid = true;

    if (!title.trim()) {
      setTitleError('Title is required');
      isValid = false;
    } else if (title.length < 3) {
      setTitleError('Title must be at least 3 characters');
      isValid = false;
    } else {
      setTitleError('');
    }

    if (!description.trim()) {
      setDescriptionError('Description is required');
      isValid = false;
    } else if (description.length < 10) {
      setDescriptionError('Description must be at least 10 characters');
      isValid = false;
    } else {
      setDescriptionError('');
    }

    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);
    try {
      await axiosInstance.post('/announcements', { title, description });
      toast.success('Announcement has been published successfully');
      setTitle('');
      setDescription('');
      setLoading(false);
      navigate('/dashboard/announcements');
    } catch (error) {
      toast.error('Failed to publish announcement');
      setLoading(false);
    }
  };

  const togglePreview = () => {
    setShowPreview(!showPreview);
  };

  return (
    <div className="max-w-5xl mx-auto p-4 md:p-6">
      {/* Header Section */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center">
          <div className="flex items-center mb-4 md:mb-0">
            <div className="bg-blue-100 p-3 rounded-full mr-4">
              <FaBullhorn className="text-blue-600 text-xl" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Make Announcement</h1>
              <p className="text-gray-600 mt-1">Create an announcement to notify all residents and members</p>
            </div>
          </div>
          <button
            type="button"
            onClick={togglePreview}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${showPreview
                ? 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                : 'bg-blue-50 text-blue-600 hover:bg-blue-100'
              }`}
          >
            {showPreview ? 'Edit Announcement' : 'Preview Announcement'}
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        {showPreview ? (
          // Preview Section
          <div className="p-6">
            <div className="mb-4 pb-4 border-b border-gray-200">
              <h2 className="text-xl font-semibold mb-1">Preview</h2>
              <p className="text-gray-600 text-sm">This is how your announcement will appear to residents</p>
            </div>

            <div className="rounded-lg border border-gray-200 p-6 mb-6 bg-gray-50">
              {title ? (
                <h3 className="text-xl font-bold text-gray-800 mb-4">{title}</h3>
              ) : (
                <div className="h-8 bg-gray-200 rounded animate-pulse mb-4"></div>
              )}

              {description ? (
                <p className="text-gray-700 whitespace-pre-wrap">{description}</p>
              ) : (
                <>
                  <div className="h-4 bg-gray-200 rounded animate-pulse mb-2 w-full"></div>
                  <div className="h-4 bg-gray-200 rounded animate-pulse mb-2 w-11/12"></div>
                  <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4"></div>
                </>
              )}
            </div>

            <div className="flex justify-between">
              <button
                type="button"
                onClick={togglePreview}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50"
              >
                <FaTimes className="inline mr-2" />
                Back to Edit
              </button>

              <button
                type="button"
                onClick={handleSubmit}
                disabled={loading || !title || !description}
                className={`px-6 py-2 rounded-md text-white font-medium flex items-center ${loading || !title || !description
                    ? 'bg-blue-400 cursor-not-allowed'
                    : 'bg-blue-600 hover:bg-blue-700'
                  }`}
              >
                {loading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Publishing...
                  </>
                ) : (
                  <>
                    <FaCheck className="mr-2" />
                    Publish Announcement
                  </>
                )}
              </button>
            </div>
          </div>
        ) : (
          // Form Section
          <div className="p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="title" className="flex items-center text-gray-700 font-medium mb-2">
                  <MdTitle className="mr-2 text-blue-600" />
                  Announcement Title
                </label>
                <input
                  type="text"
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter announcement title"
                  className={`block w-full px-4 py-3 rounded-md border ${titleError ? 'border-red-500' : 'border-gray-300'
                    } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors`}
                />
                {titleError && (
                  <p className="mt-1 text-sm text-red-600">{titleError}</p>
                )}
                <p className="mt-1 text-sm text-gray-500">
                  Keep the title short and descriptive (3-50 characters)
                </p>
              </div>

              <div>
                <label htmlFor="description" className="flex items-center text-gray-700 font-medium mb-2">
                  <MdDescription className="mr-2 text-blue-600" />
                  Announcement Content
                </label>
                <textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Enter announcement details..."
                  rows="6"
                  className={`block w-full px-4 py-3 rounded-md border ${descriptionError ? 'border-red-500' : 'border-gray-300'
                    } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors`}
                ></textarea>
                {descriptionError && (
                  <p className="mt-1 text-sm text-red-600">{descriptionError}</p>
                )}
                <p className="mt-1 text-sm text-gray-500">
                  Provide all the necessary details for your announcement (minimum 10 characters)
                </p>
              </div>

              <div className="flex justify-end space-x-4 pt-4">
                <button
                  type="button"
                  onClick={togglePreview}
                  disabled={!title && !description}
                  className={`px-4 py-2 rounded-md border border-blue-600 text-blue-600 hover:bg-blue-50 ${!title && !description ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                >
                  Preview
                </button>

                <button
                  type="submit"
                  disabled={loading}
                  className={`px-6 py-2 rounded-md text-white font-medium flex items-center ${loading
                      ? 'bg-blue-400 cursor-not-allowed'
                      : 'bg-blue-600 hover:bg-blue-700'
                    }`}
                >
                  {loading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Submitting...
                    </>
                  ) : (
                    'Submit Announcement'
                  )}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>

      {/* Tips Section */}
      <div className="mt-8 p-5 bg-blue-50 rounded-lg border border-blue-100">
        <h3 className="font-semibold text-blue-800 mb-2 flex items-center">
          <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"></path>
          </svg>
          Tips for Effective Announcements
        </h3>
        <ul className="list-disc list-inside text-blue-700 space-y-1 text-sm pl-5">
          <li>Be clear and concise in your announcement title</li>
          <li>Provide relevant details in the description</li>
          <li>Specify any deadlines or important dates if applicable</li>
          <li>Avoid using all caps or excessive punctuation</li>
        </ul>
      </div>
    </div>
  );
};

export default MakeAnnouncement;