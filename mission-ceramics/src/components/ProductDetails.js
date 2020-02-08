import React from 'react';
import '../styles/ProductDetails.scss';
import HomeItem from '../images/gallery-item.jpeg';
import 'font-awesome/css/font-awesome.min.css';

const ProductDetails = ({ addToCart, currentItem, handleClose, showProductDetails, children }) => {
  const showHideClassName = showProductDetails ? "product-details display-block" : "product-details display-none";
  if (currentItem === null) {
    return null;
  } else {
    return (
      <div className={showHideClassName} onClick={handleClose}>
        <section className="product-details-main">
          <img src={currentItem.image} alt="home-item" className="product-details-image" />
          {children}
          <div className="product-details-text">
            <h3 className="product-name">{currentItem.name}</h3>
            <p className="product-price">{currentItem.price}</p>
            <p className="product-description">{currentItem.description}</p>
            <div className="add-to-cart-btn-wrapper"><button className="add-to-cart-btn" onClick={addToCart}>ADD TO CART</button></div>
          </div>
          <i className="fa fa-times" aria-hidden="true" onClick={handleClose}></i>
        </section>
      </div>
    );
  }
};

export default ProductDetails;
