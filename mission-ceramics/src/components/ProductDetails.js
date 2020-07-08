import React from 'react';
import '../styles/ProductDetails.scss';
import 'font-awesome/css/font-awesome.min.css';
import closeButton from '../images/x-close-black@2x.png'

const ProductDetails = ({ quantity, setQuantity, addToCart, currentItem, handleClose, showProductDetails, children }) => {
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
            <label className="qty-label" for="quantity">Qty:
              <select value={quantity} id="quantity" onChange={setQuantity} className="quantity-input">
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </select>
            </label>

            <div className="add-to-cart-btn-wrapper"><button className="add-to-cart-btn" onClick={addToCart}>add to cart</button></div>
          </div>
          <div className="close-button-wrapper">
            <img src={closeButton} alt="close" className="close-button" />
          </div>
          <div className="product-details-spacer"></div>
        </section>
      </div>
    );
  }
};

export default ProductDetails;
