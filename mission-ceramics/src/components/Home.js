import React, { Component } from 'react';
import '../styles/Home.scss';
import ProductDetails from './ProductDetails';
import Announcement from './Announcement';
import Footer from './Footer';
import SvgIcon from './SvgIcon';
import { NavLink } from 'react-router-dom';

export default class Home extends Component {

  showProductDetails = (item) => {
    this.props.setItem(item);
  }

  render() {
    let itemImages = this.props.items.map((i) => {
      return (
        <div key={i.name} className="home-items-column">
          <img src={i.image} alt="home-item" className="home-item-image" onClick={() => this.showProductDetails(i)} />
          <p className="home-item-name">{i.name}</p>
          <p className="home-item-price">{i.price}</p>
        </div>
      )
    })
    let cartIconClassName = this.props.itemsInCart ? 'visible-cart' : 'hidden-cart';

    return (
      <div className="home-container">
        <ProductDetails
          addToCart={this.props.addToCart}
          currentItem={this.props.currentItem}
          showProductDetails={this.props.showProductDetails}
          handleClose={this.props.hideProductDetails}
          setQuantity={this.props.setQuantity}
          quantity={this.props.quantity}
        />
        <Announcement />
        <div id="homeHeader" className="home-header">
          <h1 className="company-name">Mission Ceramics</h1>
          <NavLink to="/cart" activeClassName="active" onClick={this.onCart} className={cartIconClassName}>
            <svg className="cart-icon" width="36" height="33" viewBox="0 0 36 33" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1.17432 5.50359e-07C0.525743 5.50359e-07 0 0.525763 0 1.17432C0 1.82288 0.525743 2.34864 1.17432 2.34864H5.70035L9.73707 21.3946C9.89678 22.1116 10.3667 22.7083 10.9603 22.7035H30.5323C31.1527 22.7121 31.7234 22.1497 31.7234 21.5292C31.7234 20.9087 31.1527 20.3461 30.5323 20.3549H11.9145L11.4129 18.0062H32.0981C32.6239 18.0023 33.1206 17.6018 33.2357 17.0888L35.9758 5.3456C36.1285 4.66408 35.5366 3.91941 34.8382 3.9144H8.44043L7.80434 0.929671C7.69321 0.408233 7.18762 -0.000547466 6.65448 5.50359e-07H1.17432ZM8.92973 6.26304H33.3581L31.1684 15.6576H10.9236L8.92973 6.26304ZM14.8747 24.2693C12.7268 24.2693 10.9603 26.0357 10.9603 28.1837C10.9603 30.3316 12.7268 32.0981 14.8747 32.0981C17.0227 32.0981 18.7891 30.3316 18.7891 28.1837C18.7891 26.0357 17.0227 24.2693 14.8747 24.2693ZM26.6179 24.2693C24.47 24.2693 22.7035 26.0357 22.7035 28.1837C22.7035 30.3316 24.47 32.0981 26.6179 32.0981C28.7659 32.0981 30.5323 30.3316 30.5323 28.1837C30.5323 26.0357 28.7659 24.2693 26.6179 24.2693ZM14.8747 26.6179C15.7534 26.6179 16.4405 27.305 16.4405 28.1837C16.4405 29.0624 15.7534 29.7494 14.8747 29.7494C13.9961 29.7494 13.309 29.0623 13.309 28.1837C13.309 27.3051 13.9961 26.6179 14.8747 26.6179ZM26.6179 26.6179C27.4966 26.6179 28.1837 27.305 28.1837 28.1837C28.1837 29.0624 27.4966 29.7494 26.6179 29.7494C25.7393 29.7494 25.0522 29.0623 25.0522 28.1837C25.0522 27.3051 25.7393 26.6179 26.6179 26.6179Z" fill="#B92227" /></svg>
            <span class="step">{this.props.itemsInCart}</span>
          </NavLink>
          <SvgIcon />
        </div>
        <div className="home-items">
          <div className="home-items-row row1">
            {itemImages[0]}{itemImages[1]}{itemImages[2]}
          </div>
          <div className="home-items-row">
            {itemImages[3]}{itemImages[4]}{itemImages[5]}
          </div>
          {/* <div className="home-items-row">
            {itemImages[6]}{itemImages[7]}{itemImages[8]}
          </div>
          <div className="home-items-row">
            {itemImages[9]}{itemImages[10]}{itemImages[11]}
          </div>
          <div className="home-items-row">
            {itemImages[12]}{itemImages[13]}{itemImages[14]}
          </div>
          <div className="home-items-row">
            {itemImages[15]}{itemImages[16]}{itemImages[17]}
          </div>
          <div className="home-items-row">
            {itemImages[18]}{itemImages[19]}{itemImages[20]}
          </div>
          <div className="home-items-row">
            {itemImages[21]}{itemImages[22]}
          </div> */}
        </div>
        <Footer />
      </div>
    )
  }
}

const productDetails = document.createElement("div");
document.body.appendChild(productDetails);
