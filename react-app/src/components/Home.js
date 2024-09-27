import React, { useState, useEffect } from 'react';
import "./Home.css";
import data from '../data.json';;

function Home() {

    // use useState to maintain user cart items, initialize with empty cart
    const [cart, setCart] = useState([]);
    // maintain popup when confirm order button is clicked
    const [showConfirmOrderPopup, setShowConfirmOrderPopup] = useState(false);

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

    const removeItem = (item) => {
      setCart((prevCart) => {
        return prevCart.reduce((newCart, cartItem) => {
          if (cartItem.name === item.name) {
            return newCart;
          }
          // keep every other item in cart
          return [...newCart, cartItem];
        }, []);
      });
    }

    const togglePopup = () => {
      setShowConfirmOrderPopup(!showConfirmOrderPopup);
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
                          <div className='image-button-container'>
                            <img src={item.image.desktop} alt={item.name} className={`food-image ${isItemInCart(item) ? 'selected-item-border' : ''}`}/>

                            { !isItemInCart(item) ? (
                                <button className='add-to-cart-button-no-item' onClick={() => handleAddToCart(item)}>
                                  <img className="add-to-cart-icon" src="/assets/images/icon-add-to-cart.svg" alt="Add to Cart" /> Add to Cart
                                </button>
                            ) : (

                              <div className='edit-cart-items'>

                                <button className='decrement-button' onClick={() => handleDecrementItem(item)}>
                                  <svg className="decrement-quantity-icon" xmlns="http://www.w3.org/2000/svg" width="10" height="2" fill="currentColor" viewBox="0 0 10 2">
                                    <path fill="currentColor" d="M0 .375h10v1.25H0V.375Z"/>
                                  </svg>
                                </button>

                                {/* quantity value is associated with cart, not data file, so have to use cart to find quantity value */}
                                <p className='item-quantity-button-text'>{cart.find(cartItem => cartItem.name === item.name).quantity}</p>

                                <button className='increment-button' onClick={() => handleIncrementItem(item)}>
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
                          <div className='cart-item-info-remove-item-container'>
                            <div>
                              <p className='cart-item-name'>{cartItem.name}</p>
                              <div className='quantity-price-container'>
                                <div className='cart-item-quantity'>{cartItem.quantity}x</div>
                                <div className='cart-item-price'>@ ${cartItem.price.toFixed(2)}</div>
                                <div className='cart-item-total-price'>${cartItem.total_price.toFixed(2)}</div>
                              </div>
                            </div>
                            <div className='remove-item-button-container'>
                              <button className='remove-item-button' onClick={() => removeItem(cartItem)}>
                                <svg className="remove-item-icon" xmlns="http://www.w3.org/2000/svg" width="10" height="10" fill="currentColor" viewBox="0 0 10 10">
                                  <path fill="currentColor" d="M8.375 9.375 5 6 1.625 9.375l-1-1L4 5 .625 1.625l1-1L5 4 8.375.625l1 1L6 5l3.375 3.375-1 1Z"/>
                                </svg>
                              </button>
                            </div>
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

                      <button className='confirm-order-button' onClick={togglePopup}>
                        Confirm Order
                      </button>
                    </div>
                  )}
                </div>

              </div>
          </div>

          {showConfirmOrderPopup && (
          <div className="popup-container">
            <div className='popup-content'>

              <div className='popup-content-container'>

                <div className="popup-title-container">
                  <svg className="order-confirmed-icon" width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M21 32.121L13.5 24.6195L15.6195 22.5L21 27.879L32.3775 16.5L34.5 18.6225L21 32.121Z" fill="#1EA575"/>
                    <path d="M24 3C19.8466 3 15.7865 4.23163 12.333 6.53914C8.8796 8.84665 6.18798 12.1264 4.59854 15.9636C3.0091 19.8009 2.59323 24.0233 3.40352 28.0969C4.21381 32.1705 6.21386 35.9123 9.15077 38.8492C12.0877 41.7861 15.8295 43.7862 19.9031 44.5965C23.9767 45.4068 28.1991 44.9909 32.0364 43.4015C35.8736 41.812 39.1534 39.1204 41.4609 35.667C43.7684 32.2135 45 28.1534 45 24C45 18.4305 42.7875 13.089 38.8493 9.15076C34.911 5.21249 29.5696 3 24 3ZM24 42C20.4399 42 16.9598 40.9443 13.9997 38.9665C11.0397 36.9886 8.73256 34.1774 7.37018 30.8883C6.0078 27.5992 5.65134 23.98 6.34587 20.4884C7.04041 16.9967 8.75474 13.7894 11.2721 11.2721C13.7894 8.75473 16.9967 7.0404 20.4884 6.34587C23.98 5.65133 27.5992 6.00779 30.8883 7.37017C34.1774 8.73255 36.9886 11.0397 38.9665 13.9997C40.9443 16.9598 42 20.4399 42 24C42 28.7739 40.1036 33.3523 36.7279 36.7279C33.3523 40.1036 28.7739 42 24 42Z" fill="#1EA575"/>
                  </svg>
                  <div className='popup-title-text'>Order Confirmed</div>
                  <div className="enjoy-food-text">We hope you enjoy your food!</div>
                </div>
                
                <div className='order-items-container'>
                  {cart.map((cartItem, index) => (
                    <div key={index} className="order-items">
                      <div className='cart-item-info-remove-item-container'>
                        <div className='popup-image-item-info-container'>
                          <div>
                            <img src={cartItem.image.desktop} alt={cartItem.name} className="popup-food-image"/>
                          </div>
                          <div>
                            <p className='cart-item-name'>{cartItem.name}</p>
                            <div className='quantity-price-container'>
                              <div className='cart-item-quantity'>{cartItem.quantity}x</div>
                              <div className='cart-item-price'>@ ${cartItem.price.toFixed(2)}</div>
                            </div>
                          </div>
                        </div>
                        <div className='order-total-price-container'>
                          <div className='order-item-total-price'>${cartItem.total_price.toFixed(2)}</div>
                        </div>
                      </div>
                      <hr className="cart-item-divider" />
                    </div>
                  ))}
                  <div className='popup-order-total-container'>
                    <div className='popup-order-total-title'>Order Total</div> 
                    <div className='popup-order-total-price'>${getOrderTotal().toFixed(2)}</div>
                  </div>
                </div>

                <button className='start-new-order-button' onClick={togglePopup}>
                  Start New Order
                </button>

              </div>

            </div>
          </div>
        )}
            
        </div>

      </div>
    );
  }
  
  export default Home;