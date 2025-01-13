const Footer = () => {
  return (
    <footer className="bg-white px-4 divide-y relative bottom-0 left-0 text-black">
      <div className="container mx-auto py-6 flex flex-col md:flex-row items-center justify-between">
        <p className="text-sm text-center">
          © 2024-2025 The Royal Palace Inc. All rights reserved.
        </p>
        <div className="flex space-x-4 mt-4 md:mt-0">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M22.675 0h-21.35C.595 0 0 .595 0 1.325v21.351C0 23.405.595 24 1.325 24h11.495v-9.294H9.691v-3.622h3.129V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.794.715-1.794 1.763v2.311h3.587l-.467 3.622h-3.12V24h6.116c.73 0 1.325-.595 1.325-1.324V1.325C24 .595 23.405 0 22.675 0z" />
            </svg>
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M22.23 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.46c.98 0 1.77-.77 1.77-1.72V1.72C24 .77 23.21 0 22.23 0zM7.12 20.45H3.56V9h3.56v11.45zM5.34 7.58c-1.14 0-2.06-.92-2.06-2.06s.92-2.06 2.06-2.06 2.06.92 2.06 2.06-.92 2.06-2.06 2.06zm15.11 12.87h-3.56v-5.6c0-1.34-.03-3.06-1.86-3.06-1.86 0-2.15 1.45-2.15 2.95v5.71H9.32V9h3.42v1.56h.05c.48-.91 1.66-1.86 3.42-1.86 3.66 0 4.34 2.41 4.34 5.54v6.21z" />
            </svg>
          </a>
        </div>
      </div>
      <div className="container mx-auto py-6 text-center text-sm ">
        <p>Contact us: rahatmiraz.dev@gmail.com</p>
        <p>Address: Sylhet, Bangladesh</p>
      </div>
    </footer>
  );
};

export default Footer;