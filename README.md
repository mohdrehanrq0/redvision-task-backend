# Backend Task

## Overview

This Node.js project serves as the backend for the RedVision Technology task, featuring secure authentication, image uploads, and role-based access control.

## Installation guide

### 1. Clone the Repository

To get started, clone the repository using the following command:

```bash
    git clone https://github.com/mohdrehanrq0/redvision-task-backend.git
```

### 2. Add Environment Variables

Create a `.env` file in the root directory and include the following environment variables:

```bash
    PORT=              # Port number for the server
    JWT_SECRET=        # Secret key for JWT encryption
    JWT_EXPIRE=180d    # JWT expiration time
    MONGO_URI=         # MongoDB connection string

    CLOUDINARY_NAME=   # Cloudinary cloud name
    CLOUDINARY_API_KEY=# Cloudinary API key
    CLOUDINARY_API_SECRET= # Cloudinary API secret
    COOKIE_HOST=  # Cookie host for deployment
```

### 3. Install Dependencies and Start the Application

Navigate to the `redvision-task-backend` folder in your terminal and run the following commands:

```bash
npm install
npm run dev
```

The application will be running at `http://localhost:4000/api/v1`

**Note** This project has been developed and tested with Node.js version `v20.17.0`.

## Feature

* **Image Upload:** Utilizes Multer and Cloudinary for image uploads and storage.
* **Security:** Implements CORS and Helmet in Express.js to enhance security.
* **Data Validation:** Uses JOI for contract validation in POST and PUT requests.
* **Authentication:** Includes middleware to check if the user is authenticated and their role for certain API endpoints.
* **Error Handling:** A centralized error handler is implemented for better error management.
* **JWT Authentication:** Authentication is handled using JWT tokens and httpOnly cookies via the cookie-parser middleware.

## API Endpoints

**Note:** You can find the postman in the repository.

## Authentication

* **Register User:** `POST /api/v1/user/signup` – Register a new user.
* **Login User:** `POST /api/v1/user/login` – Log in an existing user.
* **Logout User:** `GET /api/v1/user/logout` – Log out the current user.
* **Get Current User:** `GET /api/v1/user` – Retrieve the current user's details.

## Blogs API

* **Image Upload:** `POST /api/v1/blog/upload` – Upload an image to Cloudinary.
* **Get All Blogs:** `GET /api/v1/blog/get-all` – Fetch all the Blogs.
* **Create Blog:** `POST /api/v1/blog/create` – Create a new blog. (ADMIN API)
* **Update Blog:** `PUT /api/v1/blog//update/:blogId` – Update the existing blog. (ADMIN API)
* **Delete Blog:** `DELETE /api/v1/blog/delete/:blogId` – Delete the existing blog. (ADMIN API)
* **Get Blog:** `GET /api/v1/blog/:slug` – Get the specific blog date.
