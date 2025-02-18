# Online Furniture Shop 🛋️🛍️

## Project Overview

The **Online Furniture Shop** is a comprehensive web application designed to offer customers a seamless and enjoyable shopping experience. With a fully responsive design, this application ensures users can browse and shop for furniture items effortlessly across both desktop and mobile devices. The platform enables customers to explore, select, and purchase a wide range of furniture, all from the comfort of their homes.

The **Online Furniture Shop** is aimed at both residential and commercial customers, offering a diverse selection of furniture to match various styles and preferences. 🏡🏢

## Project Description 💻

Our **Online Furniture Shop** is a user-friendly full-stack MERN (MongoDB, Express.js, React.js, Node.js) project that provides customers with a hassle-free browsing experience, without the need for prior registration. Users can explore a variety of furniture categories, add items to their cart, and create personalized shopping lists. 

Registration is required only during checkout to ensure secure payment processing. Registered users enjoy additional features such as:

- **Order Tracking:** Monitor order status and delivery progress.
- **Order History:** View past orders and make quick re-purchases.
- **Profile Management:** Easily update personal information such as name, address, contact number, and email.

For administrators, the system offers comprehensive capabilities to manage:

- **Furniture Categories:** Add, modify, or delete categories.
- **Product Management:** Add, update, or remove furniture products.
- **Order Processing:** Efficiently manage customer orders and update inventory.

The system guarantees an up-to-date catalog, a responsive user interface, secure payment processing, and effective inventory and order management. 🔄🛠️

## Problem Statement ⚠️

Many existing furniture shopping platforms require users to create an account before browsing products, which may discourage potential customers. Additionally, current systems often lack sufficient user profile management, order tracking, and efficient administrative functionalities, leading to poor user engagement and administrative challenges. 

There is a clear need for an online furniture shop that:

- **Improves the browsing experience** without forcing users to register.
- **Enhances user profile management** and order tracking.
- **Streamlines administrative functions** for easier management of products and orders.

## Existing System 🏚️

Most current online furniture shops impose mandatory registration for users to access product listings. This leads to a higher bounce rate, as many users prefer to explore products before committing to account creation. Moreover, existing systems may lack comprehensive features for user profile management, order tracking, and efficient administrative controls, which can result in a subpar shopping experience.

## Limitations of Existing Systems 🚫

The key limitations of existing furniture shopping systems are:

- **Mandatory Registration:** Users are forced to sign up before browsing, which creates a barrier for exploration.
- **Limited Profile Management:** Users have limited control over their personal data and preferences.
- **No Order Tracking:** Customers cannot easily track their orders after purchase.
- **Inefficient Administration:** Admin users face difficulties managing categories, products, and orders efficiently.

These limitations can decrease user satisfaction, reduce engagement, and increase the complexity of administrative tasks. 😞

## Proposed System 💡

The proposed **Online Furniture Shop** offers a significant upgrade over existing systems by allowing users to browse products without the need for registration. This feature greatly enhances the user experience, especially for new customers who want to explore products before committing to an account.

Key features include:

- **Comprehensive User Profile Management:** Users can easily update their name, address, contact number, and email.
- **Order Tracking:** Customers can track their orders in real-time.
- **Admin Controls:** Admins can manage categories, products, and orders with greater efficiency.

By eliminating unnecessary steps, the proposed system makes online furniture shopping more convenient for customers while also providing powerful tools for administrators. ✨

## Objectives 🎯

The objectives of the **Online Furniture Shop** project are as follows:

- **Allow users to browse products** without the need for registration.
- **Offer comprehensive user profile management** features.
- **Enable order tracking** for customers to monitor their purchases.
- **Streamline administrative management** of categories, products, and orders.

## Benefits of the Proposed System 💥

The **Online Furniture Shop** offers several advantages, including:

- **Enhanced User Experience:** Users can browse products freely without the need for registration.
- **Improved Customer Satisfaction:** With features like order tracking and personalized profile management.
- **Efficient Administration:** Admins can easily manage product catalogs and customer orders.
- **Increased Engagement and Conversion Rates:** A user-friendly interface encourages more interaction and higher sales.
- **Higher Sales Potential:** By providing a seamless shopping experience, the system can drive more sales and boost revenue.

## Installation Guide

**Follow these steps** to set up and run the project on your local machine.

**1. Open in VSCode**
Open Visual Studio Code and press "Shift + ctrl + `" to open New terminal.

**2. Clone the repository**
- Clone Github repo project source code 
```bash
git clone https://github.com/CR7578/MERN-Project-OnlineFurnitureShop.git
```
- Change the directory into cloned project
```bash
cd MERN-Project-OnlineFurnitureShop
```

**Install the necessary npm packages** for the server-side by running:
- This will download and install all required dependencies listed in the package.json file and create a node_modules folder in the server directory.
```bash
npm i
```

**Client-side (Frontend)**
- After installing the server-side dependencies, navigate to the client directory by running:
```bash
cd client
```

- Install the required npm packages in client folder for React by running:
```bash
npm i
```
This will install the necessary packages for the frontend.

After the installation is complete, go back to the main folder by running:
```bash
cd ..
```

**3. Setup Environment Variables**
- Create a .env file in the backend directory with the following variables:

Edit this .env values
```text
PORT=8080
MONGODB_URL=mongodb://127.0.0.1:27017/<DATABASE NAME >
JWT_SECRET=<JWT TOKEN VALUE>
BRAINTREE_MERCHANT_ID =<BRAINTREE_MERCHANT_ID VALUE>
BRAINTREE_PUBLIC_KEY = <BRAINTREE_PUBLIC_KEY VALUE>
BRAINTREE_PRIVATE_KEY = <BRAINTREE_PUBLIC_KEY VALUE>
```
## Note: Refer This youtube video for getting BRAINTREE Values
https://www.youtube.com/watch?v=QyunIFPa2rI&list=PLuHGmgpyHfRzhGkSUfY0vpi67X64g0mXB&index=26

**4. Set Up MongoDB**
- Before running the application, ensure you have MongoDB installed and configured on your local system.

## Install MongoDB on Your System
Download and install MongoDB from the official MongoDB website.

**Follow the installation instructions** for your operating system.

Once installed, start the MongoDB service:

--> On Windows, use the MongoDB Compass application or start the MongoDB service via command prompt.

--> On macOS, run brew services start mongodb-community if you used Homebrew for installation.

**Create an Empty Database**
**Open the MongoDB shell or MongoDB Compass.**
- Create a new database by running the following command in the MongoDB shell:
```bash
use <DATABASE NAME >
```
This will create an empty database named onlineFurnitureShop.

- If using MongoDB Compass, create a new database via the GUI interface.



**5. Run the Application**
To run the website:
- In the terminal, navigate to the root directory of the project.
- Run the following command to start both the server and the React application concurrently:
```bash
npm run dev
```
This will start the server and the frontend React app. You can access the website on your default browser at http://localhost:3000.

## To stop the website:
- In the terminal of VScode press "Ctrl + C".

Usage
For Users: Browse and purchase various furniture items, manage your cart, and complete checkout.
For Admins: Admin users can manage product listings, view orders, and update inventory through the admin dashboard.

Contributing 🤝
We welcome contributions! If you find any issues or want to suggest improvements, feel free to create an issue or submit a pull request.

---
