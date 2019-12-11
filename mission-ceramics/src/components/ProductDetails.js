import React from 'react';
import '../styles/ProductDetails.scss';

const ProductDetails = ({ handleClose, showProductDetails, children }) => {
  const showHideClassName = showProductDetails ? "product-details display-block" : "product-details display-none";

  return (
    <div className={showHideClassName}>
      <section className="product-details-main">
        {children}
        <button onClick={handleClose}>close</button>
      </section>
    </div>
  );
};

export default ProductDetails;
