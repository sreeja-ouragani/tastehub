import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./components/loginpage"; // Import the LoginPage component
import HomePage from "./components/homepage";  // Import the HomePage component

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token"); // Check if the user is logged in

  if (!token) {
    alert("Access Denied. You must log in to access the homepage.");
    return <Navigate to="/" replace />; // Redirect to LoginPage if not logged in
  }

  return children; // Render the protected route if authenticated
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} /> {/* LoginPage as the default route */}
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <HomePage /> {/* HomePage protected by authentication */}
            </ProtectedRoute>
          }
        />
        {/* Additional routes for user and admin can be defined here if needed */}
      </Routes>
    </Router>
  );
}

export default App;
