
# 🏛 UNNEstate (MERN stack)

This is a Real Estate Web Application built with the MERN stack (MongoDB, Express.js, React, Node.js).
The platform allows users to browse available properties for rent or sale, while property owners can create and manage their own listings with ease.

The goal of this project is to provide a simple, user-friendly solution that makes it easier for UNN students and residents around Nsukka (or want to residents around Nsukka) to find accommodation or list their properties in one place.


## Features
Browse Public Listings
- Discover a variety of rental and sale properties in your preferred locations.

User Friendly Sign Up
- Create your account effortlessly using your email and password.

Sign Up with Google
-  For your convenience, the application supports Google account authentication.

Listing Management
- Once you're logged in, take control of your property listings!
- Create new listings, update existing ones, or remove listings that are no longer relevant.

View Your Listings
- Easily keep track of all your property listings in one place.

## Tech Stack

**Client:** React, ReactTypeScript, Redux Toolkit, Material UI, Formik

**API Handlers:** RTK Query

**Server:** Node, Express

**Database:** Mongo DB

**Firebase:** Google account authentication, Image Uploading

**cloudinary:**  for Uploading Images







## Screenshots

![entirepage](https://i.postimg.cc/tJgwgQLT/entirepage.png)

![home](https://i.postimg.cc/jCYnvZxH/home.png)

![sign up](https://i.postimg.cc/28FXh57t/signup.png)

![sign in](https://i.postimg.cc/bYWxsRhN/login.png)

![rent](https://i.postimg.cc/253Hs7Np/renthuz.png)

![sale](https://i.postimg.cc/6pbcf42M/salehuz.png)

![viewhuz](https://i.postimg.cc/P5Mxg1zM/viewhuz.png)

![about](https://i.postimg.cc/gcChYkVx/aboutpg.png)

![create_listing](https://i.postimg.cc/MG6KWg3M/createlisting.png)

![listing](https://i.postimg.cc/2SqgnGqc/listing.png)

![Filters page](https://i.postimg.cc/XJSMjz8S/filterpage.png)

![profile](https://i.postimg.cc/vmzDgWC2/profile.png)


## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

### Backend ###

```bash
 NODE_ENV:  development
 PORT:      8000
 DATABASE:  Insert your MongoDB database connection link
```

### Frontend ###

```bash
 REACT_APP_API_URL:  'http://127.0.0.1:8000/api/v1/'
```

```bash
 REACT_APP_FIREBASE_API_KEY:  'Enter your Firebase key'
```


## API Reference

### ROUTES

- Endpoint: `http://127.0.0.1:8000/api/v1/users`

- Endpoint: `http://127.0.0.1:8000/api/v1/listings`

### USER API

#### Signup
- **Method:** `POST`
- **Endpoint:** `/signup`

#### Login
- **Method:** `POST`
- **Endpoint:** `/login`

#### Get User
- **Method:** `GET`
- **Endpoint:** `/:id`

#### Update User
- **Method:** `PUT`
- **Endpoint:** `/update/:id`

#### Delete User
- **Method:** `DELETE`
- **Endpoint:** `/delete/:id`

#### Google Authentication
- **Method:** `POST`
- **Endpoint:** `/google`

### LISTING API

#### Get All Listings
- **Method:** `GET`
- **Endpoint:** `/get`

#### Get Single Listing
- **Method:** `GET`
- **Endpoint:** `/listing/:id`

#### Create Listing
- **Method:** `POST`
- **Endpoint:** `/`

#### Get User Listings
- **Method:** `GET`
- **Endpoint:** `/:id`

#### Delete Listing
- **Method:** `DELETE`
- **Endpoint:** `/:id`

#### Update Listing
- **Method:** `PUT`
- **Endpoint:** `/:id`

<div  align="center">

---

Made with ❤️ by Tochukwu

</div>
