import React, { useState, useEffect, useRef } from 'react';

const ProductList = ({ cart, addToCart }) => {
  const [products] = useState([
    { id: 1, name: 'Pizza Margherita', image: '/images/pizza.jpg', price: 298.99 },
    { id: 2, name: 'Pasta Alfredo', image: '/images/pasta.jpg', price: 120.99 },
    { id: 3, name: 'Burger', image: '/images/burger.jpeg', price: 89.99 },
    { id: 4, name: 'Sushi', image: '/images/sushi.jpeg', price: 79.99 },
    { id: 5, name: 'Veg Meals', image: '/images/steak.jpg', price: 140.99 },
    { id: 6, name: 'Snacks', image: '/images/snacks.jpeg', price: 95.99 },
    { id: 7, name: 'Non Veg Meals', image: '/images/nonveg.jpg', price: 150.99 },
    { id: 8, name: 'Buffet', image: '/images/buffet.jpeg', price: 500.99 },
    { id: 9, name: 'Ice Cream', image: '/images/icecream.jpeg', price: 140.99 },
  ]);

  const [cartItems, setCartItems] = useState([]); // Track the cart items
  const productListRef = useRef(null);

  useEffect(() => {
    if (productListRef.current) {
      productListRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  // Add product to cart
  const handleAddToCart = (product) => {
    setCartItems((prevItems) => [...prevItems, product]);
  };

  return (
    <div ref={productListRef} className="product-section visible">
      <h2>Explore Our Menu</h2>
      <div className="product-list-grid">
        {products.map((product) => (
          <div className="product-card" key={product.id}>
            <img src={`http://localhost:3000${product.image}`} alt={product.name} className="product-image" />
            <div className="product-info">
              <h3>{product.name}</h3>
              <p className="product-price">₹{product.price}</p>
              <button className="add-to-cart" onClick={() => handleAddToCart(product)}>
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Cart Section */}
      <div className="cart-section">
        <h3>Your Cart</h3>
        <ul>
          {cartItems.length === 0 ? (
            <p>Your cart is empty</p>
          ) : (
            cartItems.map((item, index) => (
              <li key={index}>
                <p>{item.name} - ₹{item.price}</p>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
};

export default ProductList;
