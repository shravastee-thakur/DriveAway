# DriveAway - MERN Car Rental Web App
 DriveAway is a full-stack car rental platform built with the MERN stack, offering a comprehensive and secure experience for both users and administrators. This application provides robust features including secure authentication with refresh token rotation, role-based access control, seamless car listings with image uploads, and an efficient booking system.

### Tech Stack
DriveAway leverages a powerful combination of modern technologies to deliver a fast, scalable, and secure car rental experience:

- **Frontend** - React, TailwindCSS
- **Backend** - Node.js, Express.js
- **Database** - MongoDB with Mongoose
- **Authentication** - JWT (Access & Refresh Tokens), Cookies
- **File Uploads** - express-fileupload, Cloudinary
- **Security** - Helmet, CORS, JOI validation
### Features
DriveAway comes packed with features designed to provide a smooth and secure car rental experience:

- **User Authentication** - Supports secure user registration, login, and logout functionalities.
- **JWT Access & Refresh Token Handling** - Implements JSON Web Token (JWT) for authentication, including refresh token rotation for enhanced security.
- **Role-Based Access Control (RBAC)** - Differentiates user privileges, providing distinct functionalities for regular users and administrators.
- **Car Upload with Images** - Allows users and administrators to list cars with multiple image uploads, powered by Cloudinary for efficient media management.
- **Car Booking System** - Features a dynamic booking system with automatic total price calculation based on rental duration.
### Booking Management:
- **My Bookings** - Users can view their personal booking history.
- **Admin Bookings List** - Administrators have a comprehensive view of all bookings.
- **Admin Controls** - Empowers administrators with the ability to:
  - View and delete user accounts.
Delete car listings.
Cancel or delete bookings.
- **JOI-based Request Validation** - Ensures data integrity and security through robust server-side validation of all incoming requests.
- **Secure APIs** - All APIs are secured with rate-limiting to prevent abuse and proper cookie handling for secure session management.
## Author
### Shravastee Thakur
MERN Stack Developer with a focus on Backend Development.
