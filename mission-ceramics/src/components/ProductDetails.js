import React from 'react';
import '../styles/ProductDetails.scss';

const ProductDetails = ({ handleClose, showProductDetails, children }) => {
  const showHideClassName = showProductDetails ? "product-details display-block" : "product-details display-none";

  return (
    <div className={showHideClassName} onClick={handleClose}>
      <section className="product-details-main">
        {children} child content
        <button onClick={handleClose}>close</button>
      </section>
    </div>
  );
};

export default ProductDetails;
