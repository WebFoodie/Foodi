# Foodie: Online Food Ordering Website

This project is a food ordering website with added features for browsing menus, placing orders, and real-time chat support. It is built using the MERN (MongoDB, Express.js, React.js, Node.js) stack.

## Features

- **User Authentication**: Users can sign up, log in, and log out securely.
- **Menu Browsing**: Users can browse menus from various restaurants, view items, and add them to their cart.
- **Order Placement**: Users can place orders for delivery or pickup, specify special instructions, and track their orders.
- **Responsive Design**: The website is designed to be responsive and work seamlessly across various devices.

## Technologies Used

- **MongoDB**: Database to store user data, menu items, orders, and chat messages.
- **Express.js**: Backend framework for handling server-side logic and routing.
- **React.js**: Frontend library for building the user interface.
- **Node.js**: JavaScript runtime environment for server-side scripting.

## Getting Started

### Prerequisites

- Node.js and npm installed on your machine.
- MongoDB installed locally or accessible remotely.

### Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/WebFoodie/Foodi.git
    ```

2. Navigate to the project directory:

    ```bash
    cd foodie
    ```

3. Install dependencies:

    ```bash
    cd backend
    npm install
    cd ..
    cd frontend
    npm install
    ```

4. Set up environment variables:
   
   Create a `.env` file in the root backend directory of the project and add the following variables:

    ```plaintext
    MONGODB_URI=your_mongodb_uri
    PORT=6001
    ```

5. Start the backend server:

    ```bash
    cd backend
    npm start
    ```

6. Start the frontend:

    ```bash
    cd frontend
    npm start
    ```

7. Navigate to `http://localhost:5173` in your browser to use the website.


## Contributing

Contributions are welcome! If you want to contribute to this project, please fork the repository and submit a pull request with your changes.
