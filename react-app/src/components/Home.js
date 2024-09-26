import React, { useState, useEffect } from 'react';
import "./Home.css";
import data from '../data.json';;

function Home() {

    // use useState to maintain user cart items, initialize with empty cart
    const [cart, setCart] = useState([]);

    // adding item to user cart
    const handleAddToCart = (item) => {
      setCart((prevCart) => {
        return [...prevCart, { ...item, quantity: 1, total_price: item.price}];
      });
    };

    const handleIncrementItem = (item) => {
      setCart((prevCart) => {
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
      });
    }

    const handleDecrementItem = (item) => {
      setCart((prevCart) => {
        return prevCart.reduce((newCart, cartItem) => {
          if (cartItem.name === item.name) {
            // if only 1 item in cart
            if (cartItem.quantity === 1) {
              // do not add this item to newCart array
              return newCart;
            } else {
              // if more than 1 item in cartm then decrement quantity and total item price
              return [...newCart, { ...cartItem, quantity: cartItem.quantity - 1, total_price: cartItem.total_price - item.price }];
            }
          }
          // keep every other item in cart
          return [...newCart, cartItem];
          // [] indicates newCart starts as empty array
        }, []);
      });
    };


    // grab the total number of items in cart
    const getTotalItemsInCart = () => {
      // add all quantity values together starting at 0
      return cart.reduce((total, cartItem) => total + cartItem.quantity, 0);
    };

    const isItemInCart = (item) => {
      // returns true if at least one condition returned true
      return cart.some(cartItem => cartItem.name === item.name);
    };

    const getOrderTotal = () => {
      return cart.reduce((total, cartItem) => total + cartItem.total_price, 0);
    }

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
                          <div className='image-button-container'>
                            <img src={item.image.desktop} alt={item.name} className='food-image'/>

                            { !isItemInCart(item) ? (
                                <button className='add-to-cart-button-no-item' onClick={() => handleAddToCart(item)}>
                                  <img className="add-to-cart-icon" src="/assets/images/icon-add-to-cart.svg" alt="Add to Cart" /> Add to Cart
                                </button>
                            ) : (

                              <div className='edit-cart-items'>

                                <button className='decrement-button' onClick={() => handleDecrementItem(item)}>
                                  {/* <img className="decrement-quantity-icon" src="assets/images/icon-decrement-quantity.svg" alt="Decremnet Quantity" /> */}
                                  <svg className="decrement-quantity-icon" xmlns="http://www.w3.org/2000/svg" width="10" height="2" fill="currentColor" viewBox="0 0 10 2">
                                    <path fill="currentColor" d="M0 .375h10v1.25H0V.375Z"/>
                                  </svg>
                                </button>

                                {/* quantity value is associated with cart, not data file, so have to use cart to find quantity value */}
                                <p className='item-quantity-button-text'>{cart.find(cartItem => cartItem.name === item.name).quantity}</p>

                                <button className='increment-button' onClick={() => handleIncrementItem(item)}>
                                  {/* <img className="increment-quantity-icon" src="assets/images/icon-increment-quantity.svg" alt="Increment Quantity" /> */}
                                  <svg className="increment-quantity-icon" xmlns="http://www.w3.org/2000/svg" width="10" height="10" fill="currentColor" viewBox="0 0 10 10">
                                    <path fill="currentColor" d="M10 4.375H5.625V0h-1.25v4.375H0v1.25h4.375V10h1.25V5.625H10v-1.25Z"/>
                                  </svg>
                                </button>

                              </div>

                            )}

                            
                          </div>
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
                <div className='your-cart-card-items-container'>
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
                          <div className='quantity-price-container'>
                            <div className='cart-item-quantity'>{cartItem.quantity}x</div>
                            <div className='cart-item-price'>@ ${cartItem.price.toFixed(2)}</div>
                            <div className='cart-item-total-price'>${cartItem.total_price.toFixed(2)}</div>
                          </div>
                          <hr className="cart-item-divider" />
                        </div>
                      ))}

                      <div className='order-total-container'>
                        <div className='order-total-title'>Order Total</div> 
                        <div className='order-total-price'>${getOrderTotal().toFixed(2)}</div>
                      </div>

                      <div className='carbon-neutral-container'>
                        <svg className="carbon-neutral-icon" xmlns="http://www.w3.org/2000/svg" width="21" height="20" fill="none" viewBox="0 0 21 20">
                          <path fill="#1EA575" d="M8 18.75H6.125V17.5H8V9.729L5.803 8.41l.644-1.072 2.196 1.318a1.256 1.256 0 0 1 .607 1.072V17.5A1.25 1.25 0 0 1 8 18.75Z"/><path fill="#1EA575" d="M14.25 18.75h-1.875a1.25 1.25 0 0 1-1.25-1.25v-6.875h3.75a2.498 2.498 0 0 0 2.488-2.747 2.594 2.594 0 0 0-2.622-2.253h-.99l-.11-.487C13.283 3.56 11.769 2.5 9.875 2.5a3.762 3.762 0 0 0-3.4 2.179l-.194.417-.54-.072A1.876 1.876 0 0 0 5.5 5a2.5 2.5 0 1 0 0 5v1.25a3.75 3.75 0 0 1 0-7.5h.05a5.019 5.019 0 0 1 4.325-2.5c2.3 0 4.182 1.236 4.845 3.125h.02a3.852 3.852 0 0 1 3.868 3.384 3.75 3.75 0 0 1-3.733 4.116h-2.5V17.5h1.875v1.25Z"/>
                        </svg>
                        <div className='carbon-neutral-text'>This is a <strong>carbon-neutral</strong> delivery</div> 
                      </div>

                      <button className='confirm-order-button'>
                        Confirm Order
                      </button>
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