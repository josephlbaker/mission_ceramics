import React from 'react';
import '../styles/ProductDetails.scss';
import 'font-awesome/css/font-awesome.min.css';
import closeButton from '../images/x-close-black@2x.png'

const ProductDetails = ({ quantity, setQuantity, addToCart, currentItem, handleClose, showProductDetails, children }) => {
  let baseWindowHeight = Math.max(window.innerHeight);
  let classAdded = false;
  let documentBody = document.body;
  document.addEventListener('scroll', function (e) {
    let newWindowHeight = Math.max(window.innerHeight);
    if (newWindowHeight - 50 > baseWindowHeight) {
      if (!document.body.classList.contains("ios-toolbar-gone")) {
        document.body.classList.add("ios-toolbar-gone");
      }
    } else {
      if (document.body.classList.contains("ios-toolbar-gone")) {
        document.body.classList.remove("ios-toolbar-gone");
      }
    }
  });

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
            <div className="close-button-container">
              <img src={closeButton} alt="close" className="close-button" />
            </div>
            <div className="product-details-spacer"></div>
          </div>
        </section>
      </div>
    );
  }
};

export default ProductDetails;
