import React from 'react';
import "./Home.css";
import data from '../data.json';

function Home() {
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
                          <button className='add-to-cart-button'>Add to Cart</button>
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
              <div className="your-cart-card">
                <h1 className='your-cart-title'>Your Cart</h1>
              </div>
        </div>
            
        </div>
      </div>
    );
  }
  
  export default Home;