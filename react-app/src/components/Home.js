import React from 'react';
import "./Home.css";
import data from '../data.json';

function Home() {
    return (
      <div>
        
        <div className="Page-Title-Container">
          <h1 className='Page-Title'>Desserts</h1>
        </div>

        <div className="Image-Grid">
                {data.map((item, index) => (
                    <div key={index}>
                        <img src={item.image.desktop} alt={item.name} />
                        <div className='text-container'>
                          <p className='item_category'>{item.category}</p>
                          <p className='item_name'>{item.name}</p>
                          <p className='item_price'>${item.price.toFixed(2)}</p>
                        </div>
                    </div>
                ))}
            </div>


      </div>
    );
  }
  
  export default Home;