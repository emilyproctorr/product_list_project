# Frontend Mentor - Product list with cart solution

This is a solution to the [Product list with cart challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/product-list-with-cart-5MmqLVAp_d). Frontend Mentor challenges help you improve your coding skills by building realistic projects. 

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Useful resources](#useful-resources)
- [Author](#author)

## Overview

### The challenge

Users should be able to:

- Add items to the cart and remove them
- Increase/decrease the number of items in the cart
- See an order confirmation modal when they click "Confirm Order"
- Reset their selections when they click "Start New Order"
- See hover and focus states for all interactive elements on the page

### Links

- Live Site URL: [Add live site URL here](https://emilyproctorr.github.io/product_list_project/)

## My process

### Built with

- HTML
- CSS
    - Flexbox (layout technique)
- JS (ES6)
- [React](https://reactjs.org/) - JS library

**Note: These are just examples. Delete this note and replace the list above with your own choices**

### A Few Concepts What I learned

- JS ES6 concepts

    EXAMPLES:

    - arrow functions

    ```js
    const isItemInCart = (item) => {
      return cart.some(cartItem => cartItem.name === item.name);
    };
    ```

    - template literals

    ```html
    <img src={`${process.env.PUBLIC_URL}/${item.image.desktop}`} alt={item.name}/>
    ```

    - spread operator

    ```js
    const handleAddToCart = (item) => {
      setCart((prevCart) => {
        return [...prevCart, { ...item, quantity: 1, total_price: item.price}];
      });
    };
    ```

    - and many others

- CSS
    - Flexbox layout techniques

- Git/Github
    - Host site on GitHub Pages

### Useful resources

- [CSS Flexbox Layout Guide](https://css-tricks.com/snippets/css/a-guide-to-flexbox/) - I really enjoyed this guide to CSS flexbox layout. It is very concise and I referred to it when completing this challenge.
- [Github Pages](https://github.com/gitname/react-gh-pages) - This helped me set up Github Pages Site with React App. 
- [Useful ES6 Javascript functions](https://medium.com/analytics-vidhya/useful-javascript-functions-map-filter-reduce-a06e8b446990) - One of many sites to learn more on helpful ES6 Javscript functions.

## Author

- Github - [emilyproctorr](https://github.com/emilyproctorr)
- Frontend Mentor - [@emilyproctorr](https://www.frontendmentor.io/profile/emilyproctorr)
