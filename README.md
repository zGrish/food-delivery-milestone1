# Food Delivery Backend with Order Management

## Overview

This project provides a simple backend API for managing a food delivery service. It allows restaurants to add menu items, customers to place orders, and track the status of those orders. Order statuses are updated automatically over time using a CRON job to simulate real-world order processing.

## Features

- **Add Menu Items**: Allows adding new items to the restaurant menu with name, price, and category.
- **Place Orders**: Customers can place orders by selecting multiple items from the menu.
- **Track Orders**: Orders progress automatically from `Preparing` → `Out for Delivery` → `Delivered`.

## Endpoints

### 1. Add Menu Item (POST /menu)
Create a new menu item.
- **Request Body**:
    ```json
    {
      "name": "Pizza",
      "price": 250,
      "category": "main"
    }
    ```
- **Response**:
    ```json
    {
      "id": 1,
      "name": "Pizza",
      "price": 250,
      "category": "main"
    }
    ```

### 2. Get Menu (GET /menu)
Retrieve all menu items.
- **Response**:
    ```json
    [
      {
        "id": 1,
        "name": "Pizza",
        "price": 250,
        "category": "main"
      }
    ]
    ```

### 3. Place Order (POST /orders)
Place a new order by selecting item IDs from the menu.
- **Request Body**:
    ```json
    {
      "items": [1, 2]
    }
    ```
- **Response**:
    ```json
    {
      "id": 1,
      "items": [1, 2],
      "status": "Preparing"
    }
    ```

### 4. Get Order (GET /orders/:id)
Retrieve details of a specific order by ID.
- **Response**:
    ```json
    {
      "id": 1,
      "items": [1, 2],
      "status": "Out for Delivery"
    }
    ```

### 5. Order Status Update (CRON job)
Order statuses automatically update every minute:
- From `Preparing` → `Out for Delivery` → `Delivered`.

## Installation and Setup

### Prerequisites

- **Node.js**: Install from [Node.js official website](https://nodejs.org/en/).
- **Postman**: Download Postman for testing API requests [here](https://www.postman.com/downloads/).
- **VSCode**: Recommended for code editing, download [here](https://code.visualstudio.com/).

### Setup Instructions

1. **Clone the Repository**:
    ```bash
    git clone https://github.com/your-username/food-delivery-backend.git
    cd food-delivery-backend
    ```

2. **Install Dependencies**:
    ```bash
    npm install
    ```

3. **Run the Server**:
    ```bash
    node index.js
    ```

4. The server will start at: `http://localhost:3000`.

## Testing the API

Use **Postman** to interact with the API:

- **POST /menu**: Add new menu items.
- **GET /menu**: Retrieve all menu items.
- **POST /orders**: Place a new order.
- **GET /orders/:id**: Retrieve order details.

## Simulating Order Status

The CRON job will automatically update the order status every minute, simulating real-world order processing.

## License

This project is open-source and available under the [MIT License](LICENSE).
