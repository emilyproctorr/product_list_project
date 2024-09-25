import React, { useState, useEffect } from 'react';
import "./Home.css";
import data from '../data.json';;

function Home() {

    // use useState to maintain user cart items, initialize with empty cart
    const [cart, setCart] = useState([]);

    // adding item to user cart
    const handleAddToCart = (item) => {

      setCart((prevCart) => {

        // check if item is already present in cart
        const duplicateItem = prevCart.find(cartItem => cartItem.name === item.name);

        if (duplicateItem) {
          // map() function -> creates new array with results of calling function on every element of previous array
          return prevCart.map(cartItem =>
            // if current cart item is same as item being processed
            // condition ? conditionTrue : conditionFalse
            cartItem.name === item.name
                // if condition is true, then edit cart item and increase quantity of this item and add to price
                ? { ...cartItem, quantity: cartItem.quantity + 1, total_price: cartItem.total_price + item.price} 
                // if condition false, then keep cart item the same
                : cartItem
          );
        } else {
          // new array with previous items and new cart item
          return [...prevCart, { ...item, quantity: 1, total_price: item.price}];
        }
      });
    };

    // grab the total number of items in cart
    const getTotalItemsInCart = () => {
      // add all quantity values together starting at 0
      return cart.reduce((total, cartItem) => total + cartItem.quantity, 0);
    };

    return (
      <div>
        <div className="outermost-wrapper-container">

          <div className="title-images-container">
            
            <div className="page-title-container">
              <h1 className='page-title'>Desserts</h1>
            </div>

              
            <div className="image-grid-container">
                  {data.map((item, index) => (
                      <div key={index} className="image-text-container">
                          <img src={item.image.desktop} alt={item.name} className='food-image'/>

                          <button className='add-to-cart-button' onClick={() => handleAddToCart(item)}>
                            Add to Cart
                          </button>

                          <div className='text_container'>
                            <p className='item_category'>{item.category}</p>
                            <p className='item_name'>{item.name}</p>
                            <p className='item_price'>${item.price.toFixed(2)}</p>
                          </div>
                          
                      </div>
                  ))}
            </div>

          </div>
          
          <div className="your-cart-container">
              <div className="your-cart-card-container">
                <div className='your-cart-title-container' >
                  <h1 className='your-cart-title'>Your Cart ({getTotalItemsInCart()})</h1>
                </div>
                <div className='empty-cart-icon-text-container'>
                  {cart.length === 0 ? (
                    <>
                      <img className="empty-cart-icon" src="/assets/images/illustration-empty-cart.svg" alt="Empty Cart Icon" />
                      <h2 className='empty-cart-text'>Your added items will appear here</h2>
                    </>
                  ) : (
                    <div className="cart-items-container">
                    {cart.map((cartItem, index) => (
                      <div key={index} className="cart-item">
                        <p className='cart-item-name'>{cartItem.name}</p>
                        <p className='cart-item-quantity'>{cartItem.quantity}</p>
                        <p className='cart-item-price'>${cartItem.total_price.toFixed(2)}</p>
                        <hr className="cart-item-divider" />
                      </div>
                    ))}
                    </div>
                  )}
                </div>

              </div>
          </div>
            
        </div>

      </div>
    );
  }
  
  export default Home;