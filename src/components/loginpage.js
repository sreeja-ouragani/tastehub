import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import the navigate hook from react-router-dom
import '../App.css'; // Import the CSS file for styles

function LoginPage() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [showSignup, setShowSignup] = useState(false); // State to toggle between login and signup forms
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    password: '',
  });

  const navigate = useNavigate(); // Initialize navigate hook

  const handleToggle = () => {
    setIsAdmin(!isAdmin);
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost/tastehub/backend/login.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
          role: isAdmin ? 'admin' : 'user',
        }),
      });

      const result = await response.json();
      alert(result.message); // Display success or error message

      if (result.status === 'success') {
        localStorage.setItem('token', result.token); // Save token in localStorage
        localStorage.setItem('role', result.role); // Save role in localStorage

        // Redirect based on the role
        if (result.role === 'admin') {
          navigate('/admin-homepage'); // Adjust to actual admin route
        } else {
          navigate('/user-homepage'); // Adjust to actual user route
        }
      } else {
        alert('Invalid credentials! Please try again.');
      }
    } catch (error) {
      console.error('Error during login:', error);
      alert('Login failed. Please try again.');
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost/tastehub/backend/signup.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          role: isAdmin ? 'admin' : 'user',
        }),
      });

      const result = await response.json();
      alert(result.message); // Display success or error message
    } catch (error) {
      console.error('Error during signup:', error);
      alert('Signup failed. Please try again.');
    }
  };

  const handleSignupLinkClick = () => {
    setShowSignup(true); // Show signup form
  };

  const handleBackToLogin = () => {
    setShowSignup(false); // Go back to login form
  };

  return (
    <div className="login-page" style={{ backgroundImage: "url('http://localhost:3000/images/l1.jpg')", backgroundSize: 'cover', height: '100vh' }}>
      {/* Logo */}
      <img src="/images/logo.png" alt="TasteHub Logo" className="logo" />

      <div className="form-wrapper">
        {/* Toggle between Login and Signup */}
        {!showSignup ? (
          <>
            <h2>{isAdmin ? 'Admin Login' : 'User Login'}</h2>

            <form onSubmit={handleLogin} className="login-form">
              <div className="form-group">
                <label htmlFor="email">Email:</label>
                <input
                  type="email"
                  id="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password:</label>
                <input
                  type="password"
                  id="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <button type="submit" className="login-button">
                Login
              </button>
            </form>

            <p>
              Not registered?{' '}
              <button onClick={handleSignupLinkClick} className="signup-link">
                Sign Up
              </button>
            </p>

            <button onClick={handleToggle} className="toggle-button">
              Switch to {isAdmin ? 'User' : 'Admin'} Login
            </button>
          </>
        ) : (
          <>
            <h2>{isAdmin ? 'Admin Signup' : 'User Signup'}</h2>

            <form onSubmit={handleSignup} className="signup-form">
              <div className="signup-form-group">
                <div className="form-group">
                  <label htmlFor="name">Name:</label>
                  <input
                    type="text"
                    id="name"
                    placeholder="Enter your name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email:</label>
                  <input
                    type="email"
                    id="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              <div className="signup-form-group">
                <div className="form-group">
                  <label htmlFor="phone">Phone:</label>
                  <input
                    type="text"
                    id="phone"
                    placeholder="Enter your phone number"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="address">Address:</label>
                  <input
                    type="text"
                    id="address"
                    placeholder="Enter your address"
                    value={formData.address}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="password">Password:</label>
                <input
                  type="password"
                  id="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <button type="submit" className="signup-button">
                Sign Up
              </button>
            </form>
            <p>
              Already have an account?{' '}
              <button onClick={handleBackToLogin} className="login-link">
                Login
              </button>
            </p>

            <button onClick={handleToggle} className="toggle-button">
              Switch to {isAdmin ? 'User' : 'Admin'} Signup
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default LoginPage;
