# MERN STACK E-COMMERCE DEMO APPLICATION [![Build Status](https://travis-ci.org/sarpisik/e-commerce-app.svg?branch=master)](https://travis-ci.org/sarpisik/e-commerce-app)

A Full Stack **MERN** (MongoDB-Express-React-Node JS) demo application hosted on Microsoft **Azure** Cloud Services.

[Live Demo](https://sarpisik.azurewebsites.net)

---

## **Features**

---

### **Database**

> It has 1000 dummy JSON objects as products on [MongoDB](https://www.mongodb.com/) and 200 on client.

### **Backend**

> All backend operations handled by [Express JS](https://expressjs.com/) on [Node JS](https://nodejs.org/en/)

### **Frontend**

> UI: [React Bootstrap](https://react-bootstrap.github.io/)<br>
> UI & Route Management: [React JS](https://reactjs.org/) <br>
> State Management: [Redux](https://redux.js.org/)

### **Cloud Server**

> [Microsoft Azure Cloud Services](https://azure.microsoft.com/en-us/)

### **Webpack**

> - Babel
> - Minify
> - Uglify
> - Lazy Load
> - CSS Auto Prefixes
> - Service Workers

---

## **Prerequisites**

---

### **Installing**

```
git clone https://github.com/sarpisik/e-commerce-app.git
cd e-commerce-app
npm install
```

> _Note: Before running the app, you will need to create a new .env file in the root of the app within below defined variables._

- MONGODB*CREDENTIALS = \_Your MongoDB account credentials*
- DB*NAME = \_Your database name*

* API_AUTH_USER_INFO = /api/auth/user/info
* API_AUTH_USER_CART = /api/auth/user/cart
* API_AUTH_USER_FAVORITES = /api/auth/user/favorites
* API_AUTH_USER_UPDATE = /api/auth/user/update
* API_SIGN_UP = /api/open/signUp
* API_LOGIN = /api/open/login
* API_PRODUCTS = /api/open/products
* API_PRODUCT = /api/open/product
* API_PRODUCT_SEARCH = /api/open/search

### **Start the development server**

For backend dev server only:

```
npm run server
```

For both backend and client dev server:

```
npm run demo
```

### **Build**

```
npm run build
```

---

## **App Structure**

---

### **BACKEND**

Backend codes are located under the **src/backend** directory.

- **api/** <br>
  All API calls are navigated to relative files under the api/ folder.

- **db/** <br>
  Management of the communication in between MongoDB driver and Express JS.
  All CRUD operations scripts placed here.

- **logger/** <br>
  A useful logger config for logging the backend operations under the **/logs** directory in root of the app.

- **utility/** <br>
  Contains helpers functions for tokenization, hash and salting passwords, etc...

### **CLIENT**

Front end codes are located under the **src/web** directory.

- **assets/** <br>
  Static assets such as favicon-manifest, images, logos and discounted product objects as JSON.

- **backend/** <br>
  A general class for handling the API calls and communicating between the Express and React app.

- **components/** <br>
  Contains all sub components and HOCs for UI and helper functions.

- **constants/** <br>
  Contains string values for routes, APIs, redux-action definitions, etc...

- **containers/** <br>
  Contains sub components which consume redux states.

- **pages/** <br>
  Contains all pages.

- **partials/** <br>
  Contains google analytics html integration for webpack.

- **session/** <br>
  The whole management of client side handled by these HOCs.

- **partials/** <br>
  Contains redux store and reducers.

---

## Author

- **Sarp Işık** - [Portfolio](https://www.sarpisik.com/)
