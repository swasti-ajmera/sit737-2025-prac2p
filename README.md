Below is the documentation in Markdown format:

# Step-by-Step Documentation for Setting Up the Node.js and Express Calculator API

This guide provides a detailed explanation of how to set up a **Node.js** and **Express.js** application that performs basic arithmetic operations (addition, subtraction, multiplication, and division). The application also includes logging using **Winston** to track requests and errors.

---

## Step 1: Install Node.js and npm

Before starting, ensure that you have **Node.js** installed on your system.

### Check if Node.js is installed:
1. Open a terminal or command prompt.
2. Run the following command to check if Node.js is installed:
    ```sh
    node -v
    ```
   If installed, it will return a version number.

3. Check if npm (Node Package Manager) is installed:
    ```sh
    npm -v
    ```
   This should return the npm version number.

---

## Step 2: Set Up the Project

1. Create a new directory for your project:
2. Initialize a new Node.js project:
    ```sh
    npm init -y
    ```
   This command will create a `package.json` file, which manages project dependencies.

---

## Step 3: Install Required Dependencies

1. Install **Express.js** (for handling HTTP requests):
    ```sh
    npm install express
    ```

2. Install **Winston** (for logging):
    ```sh
    npm install winston
    ```

---

## Step 4: Create the Main JavaScript File

1. Inside the `calculator-api` directory, create a file named `calculator.js`:

---

## Step 5: Understanding the Code in `calculator.js`

The **`calculator.js`** file includes the following major sections:

### 1. Import Required Modules
- **Express.js**: Used to set up the web server and define routes.
- **Winston**: Used for logging application events and errors.

### 2. Configure Winston Logger
- The logger is configured to:
  - Log messages of level `info` and above.
  - Save error logs in `error.log` and all logs in `combined.log`.
  - Print logs to the console when not in a production environment.

### 3. Define Arithmetic Functions
The code defines four functions:
- `add(n1, n2)`: Returns the sum of `n1` and `n2`.
- `sub(n1, n2)`: Returns the difference between `n1` and `n2`.
- `mul(n1, n2)`: Returns the product of `n1` and `n2`.
- `div(n1, n2)`: Returns the quotient of `n1` divided by `n2`, with error handling for division by zero.

### 4. Set Up API Endpoints
The Express application defines four routes to handle arithmetic operations:

- **Addition (`/add`)**
  - Accepts two numbers (`n1` and `n2`) as query parameters.
  - Validates the inputs to ensure they are numbers.
  - Logs the operation.
  - Returns the sum as a JSON response.

- **Subtraction (`/sub`)**
  - Accepts two numbers as query parameters.
  - Validates inputs.
  - Logs the subtraction operation.
  - Returns the result as a JSON response.

- **Multiplication (`/mul`)**
  - Accepts two numbers.
  - Validates inputs.
  - Logs the multiplication operation.
  - Returns the product as a JSON response.

- **Division (`/div`)**
  - Accepts two numbers.
  - Validates inputs and ensures that the divisor is not zero.
  - Logs the division operation.
  - Returns the quotient as a JSON response.

### 5. Start the Express Server
- The server listens on a specific port (in this example, port **3040**).
- A message is logged to the console indicating that the server is running.

---

## Step 6: Run the Application

1. Start the Express server by running:
    ```sh
    node calculator.js
    ```
   You should see a message such as:
    ```
    Server running on port 3000
    ```

2. Use your web browser or an API testing tool like Postman to test the API endpoints.

---

## Step 7: Test API Endpoints

Here are some examples to test the endpoints:

### Addition
- **Request:**  
  
  http://localhost:3040/add?n1=4&n2=298
  ```
- **Expected Response:**
  ```json
  {
      "status": 200,
      "result": 302
  }
  ```

### Subtraction
- **Request:**  
  ```
  http://localhost:3040/sub?n1=10&n2=3
  ```
- **Expected Response:**
  ```json
  {
      "status": 200,
      "result": 7
  }
  ```

### Multiplication
- **Request:**  
  ```
  http://localhost:3040/mul?n1=5&n2=6
  ```
- **Expected Response:**
  ```json
  {
      "status": 200,
      "result": 30
  }
  ```

### Division
- **Request:**  
  ```
  http://localhost:3040/div?n1=10&n2=2
  ```
- **Expected Response:**
  ```json
  {
      "status": 200,
      "result": 5
  }
  ```

---

## Step 8: Logging System

- **Error Logs:**  
  If an invalid input is provided, error messages are logged into `error.log`.

- **General Logs:**  
  All logs are saved in `combined.log` and printed to the console when not in production mode.

---

## Step 9: Stop the Server

- To stop the server, simply press **Ctrl + C** in the terminal where the server is running.

---

## Conclusion

You have successfully set up a **Node.js and Express API** that performs basic arithmetic operations. The application is designed with logging using **Winston** to monitor operations and errors. Enjoy building and expanding on this foundation!
