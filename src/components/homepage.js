import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import ProductList from './ProductList'; // Import the Explore Menu component

function Homepage() {
  const [role, setRole] = useState(null); // To store the user/admin role
  const [menuOpen, setMenuOpen] = useState(false);
  const [cart, setCart] = useState([]); // Cart state
  const [orders, setOrders] = useState([]); // Orders that have been placed
  const [cartOpen, setCartOpen] = useState(false); // Toggle cart visibility
  const [showWelcomeMessage, setShowWelcomeMessage] = useState(true); // Display welcome message
  const navigate = useNavigate();

  const welcomeMessageRef = useRef(null); // Reference for smooth scroll

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const toggleCart = () => {
    setCartOpen(!cartOpen); // Toggle cart section visibility
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

  const handleHomeClick = () => {
    setShowWelcomeMessage(true); // Show welcome message when Home is clicked
  };

  const addToCart = (product) => {
    setCart([...cart, product]); // Add the selected product to the cart
  };

  const placeOrder = () => {
    setOrders([...orders, ...cart]); // Add cart items to orders
    setCart([]); // Clear the cart after placing the order
  };

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
          </ul>
        </div>
      ) : role === 'user' ? (
        <div className="home-container">
          {/* Header */}
          <header className="header">
            <div className="logo-container">
              <img src="/images/logo.png" alt="Taste Hub Logo" className="logo" />
            </div>
            {/* Navigation Buttons */}
            <div className="nav-buttons">
              <button className="nav-button" onClick={handleHomeClick}>
                Home
              </button>
              <button className="nav-button" onClick={() => setShowWelcomeMessage(false)}>
                Explore Menu
              </button>
              <button className="nav-button" onClick={() => alert('My Orders functionality coming soon!')}>
                My Orders
              </button>
            </div>

            <div className="hamburger" onClick={toggleMenu}>
              &#9776;
            </div>
          </header>

          {/* Menu Options */}
          {menuOpen && (
            <div className="menu">
              <button className="menu-option" onClick={toggleCart}>
                My Cart
              </button>
              <button className="menu-option" onClick={() => setOrders([])}>
                My Orders
              </button>
            </div>
          )}

          {/* Main Content */}
          <div className="main-content">
            {/* Welcome Message */}
            {showWelcomeMessage && (
              <div ref={welcomeMessageRef} className="welcome-message">
                Welcome to TasteHub, where every meal tells a story. Ready to explore delicious options and make your dining experience unforgettable? Let's get started!
              </div>
            )}

            {/* Product List */}
            {!showWelcomeMessage && <ProductList cart={cart} addToCart={addToCart} />}
          </div>

          {cartOpen && (
            <div className="cart-section">
              <h2>My Cart</h2>
              <div className="cart-items">
                {cart.length > 0 ? (
                  cart.map((product, index) => (
                    <div className="cart-item" key={index}>
                      <h3>{product.name}</h3>
                      <p>{product.price}</p>
                    </div>
                  ))
                ) : (
                  <p>Your cart is empty.</p>
                )}
              </div>
              <button onClick={placeOrder} className="place-order-btn">
                Place Order
              </button>
            </div>
          )}

          {orders.length > 0 && (
            <div className="orders-section">
              <h2>My Orders</h2>
              <div className="orders">
                {orders.map((order, index) => (
                  <div className="order-item" key={index}>
                    <h3>{order.name}</h3>
                    <p>{order.price}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      ) : (
        <p>Loading...</p> // Loading state until role is fetched
      )}
    </div>
  );
}

export default Homepage;
