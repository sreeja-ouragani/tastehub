import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Homepage() {
  const [role, setRole] = useState(null); // To store the user/admin role
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  
  
    const toggleMenu = () => {
      setMenuOpen(!menuOpen);
    };
    
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
      <h1>user page!</h1>

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

        <div className="home-container">
        {/* Header */}
        <header className="header">
          <div className="logo-container">
            <img src="/images/logo.png" alt="Taste Hub Logo" className="logo" />
          </div>
          <div className="nav-buttons">
            <button className="nav-button">Home</button>
            <button className="nav-button">Reservation</button>
            <button className="nav-button">My Orders</button>
          </div>
          <div className="hamburger" onClick={toggleMenu}>
            &#9776;
          </div>
        </header>
  
        {/* Menu Options */}
        {menuOpen && (
          <div className="menu">
            <button className="menu-option">My Profile</button>
            <button className="menu-option">Sign Out</button>
          </div>
        )}
  
        {/* Main Content */}
        <div className="main-content">
          {/* Your content here */}
        </div>
      </div>

      ) : (
        <p>Loading...</p> // Loading state until role is fetched
      )}
    </div>
  );
}

export default Homepage;
