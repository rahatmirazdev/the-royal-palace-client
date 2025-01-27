# 🏢 The Royal Palace

The Royal Palace is a comprehensive platform designed to manage a single building efficiently. It caters to both user and admin functionalities, providing a seamless experience for managing apartments, agreements, payments, and announcements.

## 🌟 Project Overview

The Building Management System enables users to:
- Add, update, and delete apartments.
- Search for and book apartments based on availability and rent range.
- Get real-time updates on apartment availability and booking statuses.
- Manage user roles and permissions.
- Make and manage announcements.
- Handle payments and apply coupons.

## 🚀 Live Link

[Visit The Royal Palace Live](https://your-live-site-url.com)

## 🔧 Main Technologies Used

- **React**: For building a dynamic and responsive user interface.
- **Node.js & Express.js**: For creating robust backend services.
- **MongoDB**: To store and manage apartment and user data.
- **Firebase Authentication**: For secure user registration and login.
- **Tailwind CSS**: A utility-first CSS framework for modern, responsive design.
- **React Toastify**: For displaying success and error notifications.
- **React Router**: For seamless navigation between pages.
- **Stripe**: For handling payments.
- **TanStack Query**: For efficient data fetching.

## 🌟 Key Features

1. **User Authentication**
   - Secure registration and login using email and password.
   - Google sign-in for quick access.

2. **Apartment Management**
   - Add new apartments with details like floor number, block name, apartment number, rent, and image.
   - Update or delete apartments in the inventory.

3. **Booking System**
   - Search and book apartments based on rent range.
   - View detailed apartment information before booking.
   - Apply for agreements with pending status by default.

4. **Responsive Design**
   - Fully responsive UI for a seamless experience on mobile, tablet, and desktop devices.

5. **User Dashboard**
   - View profile information and announcements.
   - Members can make payments and view payment history.

6. **Admin Dashboard**
   - Manage members, make announcements, handle agreement requests, and manage coupons.

7. **Notifications**
   - Show toast notifications for all CRUD operations and authentication actions.

## 🛠️ Installation Guide

Follow these steps to run Building Management System on your local machine:

1. Clone the repository:
    ```bash
    git clone https://github.com/your-repo-url.git
    ```
2. Navigate to the project directory:
    ```bash
    cd your-repo-url
    ```
3. Install dependencies:
    ```bash
    npm install
    ```
4. Set up environment variables:
    - Create a `.env` file in the root directory.
    - Add your Firebase configuration and MongoDB credentials:
     ```plaintext
    VITE_API_KEY=your_api_key
    VITE_AUTH_DOMAIN=your_auth_domain
    VITE_PROJECT_ID=your_project_id
    VITE_STORAGE_BUCKET=your_storage_bucket
    VITE_MESSAGING_SENDER_ID=your_messaging_sender_id
    VITE_APP_ID=your_app_id
    VITE_API_URL=your_api_url
    VITE_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
    STRIPE_SECRET_KEY=your_stripe_secret_key
    DB_USER=your_db_user
    DB_PASS=your_db_pass
     ```
5. Start the development server:
    ```bash
    npm run dev
    ```
6. Open your browser and visit the given url from the terminal to view the application.

## 📅 Dependencies

Here are the main dependencies used in the project:

- `react`
- `firebase`
- `mongodb`
- `tailwindcss`
- `react-toastify`
- `react-router-dom`
- `stripe`
- `@tanstack/react-query`

Simplify building management and enhance user experience with Building Management System!

## Admin Credentials

- **Username**: admin@example.com
- **Password**: adminpassword

## Commit Guidelines

- Include at least 20 meaningful commits on the client side with descriptive messages.
- Include at least 12 meaningful commits on the server side with descriptive messages.

## Deployment Guidelines

- Ensure the server is working perfectly on production without any CORS/404/504 errors.
- Ensure the live link is working perfectly without errors on landing.
- Ensure the page doesn't throw any error on reloading from any routes.
- Add your domain for authorization to Firebase if you use Netlify/Surge/Vercel.
- Ensure logged-in users are not redirected to the login page on reloading any private route.

## Environment Variables

- Secure Firebase configuration keys using environment variables.
- Secure MongoDB credentials using environment variables.

## Data Fetching

- Implement TanStack Query in all the data fetching functionality (For GET method only).

## Design Guidelines

- Create a design that encourages recruiters with pleasing color contrast and proper alignment and spacing.
- Ensure the website is fully responsive on mobile, tablet, and desktop.
- Avoid using any Lorem ipsum text on the website.
- Show sweet alert/toast notifications for all CRUD operations, successful authentication login, and sign-up.

## Home Page

- Navbar with logo, website name, Home, Apartment, and Login icon (conditional).
- Fancy banner with automatic slides.
- About the building section with good typography.
- Coupons section displayed in a fancy way.
- Location details section with map or image.
- Footer with social links and relevant information.

## Authentication System

- Login and Register pages with email and password-based authentication.
- Google login option.
- Password verification with specific criteria.
- Toast notifications for successful login or registration.

## Apartment Page

- Display all apartments with image, floor number, block name, apartment number, rent, and agreement button.
- Store apartment information in the database manually.
- Apply pagination and search functionality based on rent range.

## User Dashboard

- View profile information and announcements.

## Member Dashboard

- View profile information, make payments, view payment history, and announcements.

## Admin Dashboard

- Manage members, make announcements, handle agreement requests, and manage coupons.