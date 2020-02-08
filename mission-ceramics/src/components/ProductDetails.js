import React from 'react';
import '../styles/ProductDetails.scss';
import HomeItem from '../images/gallery-item.jpeg';
import 'font-awesome/css/font-awesome.min.css';

const ProductDetails = ({ handleClose, showProductDetails, children }) => {
  const showHideClassName = showProductDetails ? "product-details display-block" : "product-details display-none";

  const handleChildClick = () => {
    return;
  }

  return (
    <div className={showHideClassName} onClick={handleClose}>
      <section className="product-details-main" onClick={handleChildClick}>
        <img src={HomeItem} alt="home-item" className="product-details-image" />
        {children}
        <div className="product-details-text">
          <h3 className="product-name">Tenmoku Jar</h3>
          <p className="product-price">$199</p>
          <p className="product-description">Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet.</p>
          <div className="add-to-cart-btn-wrapper"><button className="add-to-cart-btn">ADD TO CART</button></div>
        </div>
        <i className="fa fa-times" aria-hidden="true" onClick={handleClose}></i>
      </section>
    </div>
  );
};

export default ProductDetails;
