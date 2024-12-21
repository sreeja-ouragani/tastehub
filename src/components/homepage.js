import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Homepage() {
  const [role, setRole] = useState(null); // To store the user/admin role
  const navigate = useNavigate();

  useEffect(() => {
    // Get the role from localStorage
    const storedRole = localStorage.getItem('role');

    // If no role is found, redirect to the login page
    if (!storedRole) {
      navigate('/login'); // Redirect to login if not logged in
    } else {
      setRole(storedRole); // Set the role (admin/user)
    }
  }, [navigate]);

  // Render content based on role
  return (
    <div>
      <h1>Welcome to TasteHub!</h1>

      {role === 'admin' ? (
        <div>
          <h2>Admin Dashboard</h2>
          <ul>
            <li>Manage Users</li>
            <li>View Orders</li>
            <li>Update Menus</li>
            {/* Add more admin-specific features here */}
          </ul>
        </div>
      ) : role === 'user' ? (
        <div>
          <h2>User Dashboard</h2>
          <ul>
            <li>View Menu</li>
            <li>Place Orders</li>
            <li>Track Your Orders</li>
            {/* Add more user-specific features here */}
          </ul>
        </div>
      ) : (
        <p>Loading...</p> // Loading state until role is fetched
      )}
    </div>
  );
}

export default Homepage;
