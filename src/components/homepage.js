import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const [role, setRole] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedRole = localStorage.getItem("role");
    if (storedRole) {
      setRole(storedRole);
    } else {
      navigate("/");  // If no role is found, redirect to login page
    }
  }, [navigate]);

  if (role === null) return <div>Loading...</div>;  // Show loading state

  return (
    <div>
      <h1>Welcome to TasteHub!</h1>
      {role === 'user' ? (
        <div>
          <h2>User Homepage</h2>
          {/* User-specific content */}
        </div>
      ) : role === 'admin' ? (
        <div>
          <h2>Admin Homepage</h2>
          {/* Admin-specific content */}
        </div>
      ) : (
        <div>
          <h2>Access Denied</h2>
          <p>Your role is not authorized to access this page.</p>
        </div>
      )}
    </div>
  );
};

export default HomePage;
