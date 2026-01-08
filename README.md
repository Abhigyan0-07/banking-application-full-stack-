# Horizon Bank

Horizon Bank is a comprehensive full-stack banking application that replicates core digital banking functionalities. It allows users to create accounts, manage funds, perform secure transfers with PIN verification, and search for other users.

## Features

- **User Authentication**: Secure Signup and Signin using JWT and Bcrypt.
- **Account Management**: View current balance and account details.
- **Secure Transactions**: Transfer money to other users with PIN verification and ACID-compliant database transactions.
- **User Search**: Search for other users by name to initiate transfers.
- **Security**:
    - Transaction PIN verification.
    - Protection against malicious users.
    - Risk detection system.
- **Responsive UI**: Built with React and Tailwind CSS for a seamless experience.

## Tech Stack

### Frontend
- **React**: UI Library
- **Tailwind CSS**: Utility-first CSS framework
- **Vite**: Build tool
- **Axios**: HTTP client
- **React Router**: Navigation

### Backend
- **Node.js & Express**: Runtime and Web Framework
- **MongoDB & Mongoose**: Database and ODM
- **Zod**: Input validation
- **JWT**: Authentication
- **Bcrypt**: Password hashing

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (Local or Atlas URL)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Abhigyan0-07/banking-application-full-stack-.git
   cd banking-application-full-stack-
   ```

2. **Backend Setup**
   ```bash
   cd backend
   npm install
   # Create a .env file
   # MONGO_URL=your_mongodb_url
   # JWT_SECRET=your_jwt_secret
   # PORT=3000
   npm run dev
   ```

3. **Frontend Setup**
   ```bash
   cd frontend
   npm install
   # Create a .env file if needed
   # VITE_SERVER_URL=http://localhost:3000/api/v1
   npm run dev
   ```

## API Endpoints

### User Routes (`/api/v1/user`)
- `POST /signup`: Create a new user account.
- `POST /signin`: Log in to an existing account.
- `PUT /`: Update user information (password, name).
- `GET /bulk?filter=...`: Search for users by name.
- `GET /getUser`: Get current logged-in user details.

### Account Routes (`/api/v1/account`)
- `GET /balance`: Get account balance.
- `POST /transfer`: Transfer funds to another user (Requires PIN).

## License

This project is licensed under the ISC License.
