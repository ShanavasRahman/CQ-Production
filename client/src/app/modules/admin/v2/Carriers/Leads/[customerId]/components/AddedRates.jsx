import React, { useState, useEffect } from "react";
import axios from 'axios'

const CartTab = ({ customerId }) => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await axios.get(`https://backend.cloudqlobe.com/v3/api/customers/${customerId}/cart`);
        setCartItems(response.data);
      } catch (error) {
        console.error("Error fetching cart items:", error);
      } finally {
        setLoading(false);
      }
    };

    if (customerId) fetchCartItems();
  }, [customerId]);

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h2>Cart Items</h2>
      {/* Render cart items */}
      {cartItems.map(item => (
        <div key={item.id}>{item.name} - {item.price}</div>
      ))}
    </div>
  );
};

export default CartTab;
