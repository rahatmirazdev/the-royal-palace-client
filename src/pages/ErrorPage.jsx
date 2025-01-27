import { useNavigate } from 'react-router-dom';

const ErrorPage = () => {
  const navigate = useNavigate();

  return (
    <section className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="container flex flex-col items-center justify-center px-6 py-12 mx-auto text-center">
        <div className="p-3 text-sm font-medium text-lime-500 rounded-full bg-blue-50 mb-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            className="w-12 h-12"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
            />
          </svg>
        </div>
        <h1 className="mt-3 text-3xl font-semibold text-gray-800 md:text-4xl">
          Something Went Wrong!
        </h1>
        <p className="mt-4 text-gray-500">Here are some helpful links:</p>

        <div className="flex items-center w-full mt-6 gap-x-3 sm:w-auto">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center justify-center w-full px-5 py-2 text-sm text-gray-700 transition-colors duration-200 bg-white border rounded-lg gap-x-2 sm:w-auto hover:bg-gray-200"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Go Back
          </button>
          <button
            onClick={() => navigate('/')}
            className="flex items-center justify-center w-full px-5 py-2 text-sm text-white transition-colors duration-200 bg-blue-500 border border-blue-500 rounded-lg gap-x-2 sm:w-auto hover:bg-blue-600"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4v16m8-8H4"
              />
            </svg>
            Home
          </button>
        </div>
      </div>
    </section>
  );
};

export default ErrorPage;